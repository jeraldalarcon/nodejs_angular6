module.exports = (app)=>{
  // const samples = require('../controllers/sample.controller.js');

const samples = require('.././controllers/sample.controller.js');


  app.post('/samples',samples.create);

  app.get('/samples',samples.findAll);

  app.get('/samples/:sampleId',samples.findOne);

  app.put('/samples/:sampleId',samples.update);

  app.delete('/samples/:sampleId', samples.delete)
}
