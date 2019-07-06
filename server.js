const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./database.config.js');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const gm = require('gm');
const Sample = require('./models/sample.model');
const app = express();


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

 
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true}));


app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'sample2/dist/sample2')));
// app.get('*', express.static(path.join(__dirname, 'sample2/dist/sample2')));
app.get('*', function(req, res){
  res.sendFile(path.resolve('sample2/dist/sample2/index.html'));

});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
  useNewUrlParser:true
}).then(()=>{
  console.log('Successfully connected to the database');
}).catch(err =>{
  console.log('could not connected to the database',err);
  process.exit();
})

// app.get('/',(req,res)=>{
//   res.json({"message":"Welcome back Jerald"})
// });


// app.post('/uploadphoto', upload.single('picture'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file)
  
// })
    // }
    // }


//----------------------------------------- get ALll upload image ----------------------------------------//
app.get('/uploadphoto', (req, res) => {
  Sample.find({},((err, result) => {
   
        const imgArray= result.map(element => element._id);
              console.log(imgArray);
   
     if (err) return console.log(err)
     res.send(imgArray)
   
    }))
  });
//---------------------------------------- END of all upload image ---------------------------------------//

///start of upload photo
app.post('/uploadphoto', upload.single('picture'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
  };

  const sample = new Sample({
    contentType: req.file.mimetype,
    image:  new Buffer(encode_image, 'base64')
  });

  sample.save()
  .then(data =>{
    res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message: err.message
    });
  })
})
////end of upload photo

//get photo by id
app.get('/uploadphoto/:id', (req, res) => {
  var filename = req.params.id;
   
  Sample.findOne({'_id': filename }, (err, result) => {
   
      if (err) return console.log(err)
   
     res.contentType('image/jpeg');
     res.send(result.image.buffer)
     
      
    })
  })

  ///end of get photo by id

require('./routes/sample.routes.js')(app);

app.listen(8000,()=>{
  console.log("Server is listening on port 8000");
})
