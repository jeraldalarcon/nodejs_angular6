const mongoose = require('mongoose');

const SampleSchema = mongoose.Schema({
  title: String,
  content: String,
  contentType:Object,
  image:Object
},{
  timestamp: true
})

module.exports = mongoose.model('Sample',SampleSchema)
