const mongoose = require("mongoose")
// schema
const CommitSchema = new mongoose.Schema({
  sha: {type:String, required:true, unique:true},
  link: {type:String, required:true, unique:true},
  authors: {type:[{type:String}], default:[]},
  authorDate: {type:Date, required:true},
  summary: {type:String, required:true},
  worktime: {type:Number, required:true},
  branch: {type:String, required:true}
});

module.exports = CommitSchema