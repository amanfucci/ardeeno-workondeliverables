const Cp = require('child_process')
const Split2 = require('split2')
const ListStream = require('list-stream')
const CommitStream = require('commit-stream')
const mongoose = require('mongoose')
const {toDec, emailToAuthor, branches, repos} = require('./utils/utils')
const CommitSchema = require('./schemas/commitSchema')

const MONGODB_URI = 'mongodb://localhost:27017/report'

module.exports = async () => {

  mongoose.connect(
    MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    async (err) => {
      if (err) return console.log("Error: ", err)
      console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)

      for(let b of branches)
        await mongoose.model('Commit_'+b, CommitSchema, 'Commits_'+b).remove()
      for(let r of repos)
        await mongoose.model('Commit_'+r, CommitSchema, 'Commits_'+r).remove()

      await main()
    }
  )

  const prefixToRepo = (prefix) => {
    switch(prefix){
      case 'wd':
        return 'ardeeno-workondeliverables';
      case 'be':
        return 'ardeeno-backend';
      case 'fe':
        return 'ardeeno-frontend';
      case 'dl':
        return 'ardeeno-datalayer';
    }
  }

  const manageCommits = (b, prefix) => 
    (err, list) => {
      const myCommit = mongoose.model('Commit_'+b, CommitSchema, 'Commits_'+b)
      // convert to model named Commit
      list.forEach(async com => {
        // not considering stashes
        if(/WIP on .*/g.exec(com.summary)?.[0] == null &&
          /index on .*/g.exec(com.summary)?.[0] == null){
          // cleaned commit
          let ccom = {
            sha:prefix+'-'+com.sha,
            link:'https://github.com/T41-SE22/'+prefixToRepo(prefix)+'/commit/'+com.sha,
            authors:[emailToAuthor(com.author.email)],
            authorDate:com.authorDate,
            summary:com.summary,
            worktime:b !='pm' ? (toDec(com.summary)+toDec(com.description)) : 0,
            branch:b
          }
          
          // add co-authors
          if(com.description != null){
            const coauthors = com.description.length <= 1 ? [] : com.description;
            for(let s of coauthors){
              let str = /<(.*)>/g.exec(s)?.[1]
              if(str != null)
                ccom.authors.push(emailToAuthor(str[0]))
            }
          }
          console.log(ccom)
          try{
            await myCommit.create(ccom)
          }catch(err){
            console.log(err)
          }
        }
      })
    }

  const main = async () => {
    for(let b of branches){
      console.log(b)

      Cp.spawn('bash', [ '-c', 'git log '+b])
      .stdout
      .pipe(Split2())
      .pipe(CommitStream('rvagg', 'commit-stream'))
      .pipe(ListStream.obj(manageCommits(b, 'wd')))
    }

    Cp.spawn('bash', [ '-c', 'git log origin/d3-diagramma-classi'])
    .stdout
    .pipe(Split2())
    .pipe(CommitStream('rvagg', 'commit-stream'))
    .pipe(ListStream.obj(manageCommits('d3', 'wd')))
    
    Cp.spawn('bash', ['-c', 'cd ~/GitRepos/ardeeno-frontend && git log --all'])
    .stdout
    .pipe(Split2())
    .pipe(CommitStream('rvagg', 'commit-stream'))
    .pipe(ListStream.obj(manageCommits('fe', 'fe')))

    Cp.spawn('bash', ['-c', 'cd ~/GitRepos/ardeeno-backend && git log --all'])
    .stdout
    .pipe(Split2())
    .pipe(CommitStream('rvagg', 'commit-stream'))
    .pipe(ListStream.obj(manageCommits('be', 'be')))

    Cp.spawn('bash', ['-c', 'cd ~/GitRepos/ardeeno-datalayer && git log --all'])
    .stdout
    .pipe(Split2())
    .pipe(CommitStream('rvagg', 'commit-stream'))
    .pipe(ListStream.obj(manageCommits('dl', 'dl')))
  }

}