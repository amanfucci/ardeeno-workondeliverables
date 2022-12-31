const mongoose = require("mongoose")
// schema
const CommitSchema = require("../schemas/commitSchema")

const Commit = mongoose.model('Commit', CommitSchema, 'Commits'); //convert to model named Commit
module.exports = Commit