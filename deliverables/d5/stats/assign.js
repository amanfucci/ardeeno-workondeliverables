const mongoose = require('mongoose')
const Commit = require('./models/commit')
const CommitSchema = require('./schemas/commitSchema')
const {branches, repos} = require('./utils/utils')
const MONGODB_URI = 'mongodb://localhost:27017/report'

module.exports = () => {

  mongoose.connect(
    MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    async (err) => {
      if (err) return console.log("Error: ", err)
      console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
      await Commit.remove()
      await main()
    }
  )

  const main = async () => {
    for(let i=0; i < branches.length; i++){
      const b = branches[i]
      const myModel = mongoose.model('Commit_'+b, CommitSchema, 'Commits_'+b)
      // remove commits published on previous branches
      for(let j=0; j < i; j++){
        const b_prev = branches[j]
        const prevModel = mongoose.model('Commit_'+b, CommitSchema, 'Commits_'+b_prev)
        const prevCommits = await prevModel.find().exec()
        await myModel.deleteMany({sha:{$in:prevCommits.map(com => com.sha)}})
      }
      // add commits to Commit
      const myCommits = await myModel.find().exec()
      for(let com of myCommits){
        console.log(com)
        try{
          await Commit.create({
            sha: com.sha,
            link: com.link,
            authors: com.authors,
            authorDate: com.authorDate,
            summary: com.summary,
            worktime: com.worktime,
            branch: com.branch
          })
        }catch(err){
          console.log(err)
        }
      }
    }

    for(let b of repos){
      const myModel = mongoose.model('Commit_'+b, CommitSchema, 'Commits_'+b)
      const myCommits = await myModel.find().exec()
      // add commits to Commit
      for(let com of myCommits){
        console.log(com)
        try{
          await Commit.create({
            sha: com.sha,
            link: com.link,
            authors: com.authors,
            authorDate: com.authorDate,
            summary: com.summary,
            worktime: com.worktime,
            branch: com.branch
          })
        }catch(err){
          console.log(err)
        }
      }
    }
    //process.exit()
  }

}