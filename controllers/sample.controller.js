const Sample = require('.././models/sample.model.js');

exports.create = (req,res)=>{
  const sample = new Sample({
    title: req.body.title,
    content: req.body.content
  });

  sample.save()
  .then(data =>{
    res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message: err.message
    });
  })

}

exports.findAll = (req,res)=>{
  Sample.find()
    .then(samples =>{
      res.send(samples);
    }).catch(err =>{
      res.status(500).send({
        message: err.mesage || "SOme error occurred while retrieving samples"
      })
    })
}

exports.findOne = (req,res)=>{
  Sample.findById(req.params.sampleId)
  .then(sample =>{
    if(!sample){
      return res.status(404).send({
        message: "Sample not found wiht id " + req.params.sampleId
      });
    }
    res.send(sample);
  }).catch(err =>{
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "sample not found with id" + req.params.sampleId
      });
    }
    return res.status(500).send({
      message: "Error retrieving sample with id" + req.params.sampleId
    })
  })

}

exports.update = (req,res)=>{
  if(!req.body.content){
    return res.status(400).send({
      message: "Sample content can not be empty"
    });
  }

  Sample.findByIdAndUpdate(req.params.sampleId,{
    title: req.body.title || "Untitle Sample",
    content: req.boyd.content
  })
  .then(sample =>{
    if(!sample){
      return res.status(404).send({
        message: "Sample not found with id" + req.params.sampleId
      });
    }
    res.send(sample);
  }).catch(err =>{
    if(err.kind === 'ObjectId'){
      return res.status(404).send({
        message: "Sample not found with id "+ req.params.sampleId
      });
    }
  })

}

exports.delete = (req,res)=>{

}
