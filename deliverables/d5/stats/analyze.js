const mongoose = require('mongoose')
const Commit = require('./models/commit')
const CommitSchema = require('./schemas/commitSchema')
const {repos} = require('./utils/utils')
const MONGODB_URI = 'mongodb://localhost:27017/report'
const fs = require('fs')
const { setTimeout } = require('timers/promises')


module.exports = () => {

  let commits = {
    n:0,
    np:0,
    sum:0,
    mean:undefined,
    sd2:undefined,
    min:undefined,
    max:undefined,
    list:[]
  };

  let authors = {
    a:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    e:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    m:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    }
  }


  let authorsca = {
    a:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    e:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    m:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    ae:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]      
    },
    aem:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]            
    },
    x:{
      n:0,
      np:0,
      sum:0,
      sums:{d1:0, d2:0,d3:0, d4:0,d5:0},
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]            
    }
  }

  let delivs = {
    d1: {
      n:0,
      np:0,
      sum:0,
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    d2: {
      n:0,
      np:0,
      sum:0,
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    d3: {
      n:0,
      np:0,
      sum:0,
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    d4: {
      n:0,
      np:0,
      sum:0,
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    },
    d5: {
      n:0,
      np:0,
      sum:0,
      mean:undefined,
      sd2:undefined,
      min:undefined,
      max:undefined,
      list:[]
    }
  }

  mongoose.connect(
    MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    async (err) => {
      if (err) return console.log("Error: ", err)
      console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
      await main()
    }
  )

  const calcStats = (o)=>{
    const listp = o.list.filter(com => com.worktime > 0)
    const _np = listp.length
    let _max = 0
    let _min = 100
    let _sum = 0

    for(let com of listp){
      _sum += com.worktime
      _min = com.worktime < _min && com.worktime != 0 ? com.worktime : _min;
      _max = com.worktime > _max ? com.worktime : _max;
    }

    let _mean =  _sum/_np
    let _sd2 = 0.0

    for(let com of listp){
      _sd2 += (com.worktime-_mean)**2
    }

    _sd2 = _sd2/(_np-1)

    //Load statistics to object
    o = {
      ...o,
      np:_np,
      sum:_sum,
      mean:_mean,
      sd2:_sd2,
      min:_min,
      max:_max
    }
    return o
  }

  const toDeliv = (branch) => {
    if(Object.keys(delivs).includes(branch))
      return branch
    else if(branch == 'pm')
      return 'd5'
    else// => branch = be | fe | dl
      return 'd4'
  }

  const main = async () => {

    // setup commits.list
    commits.list = (await Commit.find().exec())
    commits.n = commits.list.length
    // setup delivs.[..].list
    for(let d in delivs){
      delivs[d].list = await mongoose.model('Commit_'+d, CommitSchema, 'Commits_'+d).find().exec()
      delivs[d].n = delivs[d].list.length
    }
    delivs.d5.list.push(...(await mongoose.model('Commit_pm', CommitSchema, 'Commits_pm').find().exec()))
    delivs.d5.n = delivs.d5.list.length
    ///get repos
    for(let r of repos){
      const comms = await mongoose.model('Commit_'+r, CommitSchema, 'Commits_'+r).find().exec()
      delivs.d4.list.push(...comms)
    }
    delivs.d4.n = delivs.d4.list.length
    
    // setup author[..].list
    for(let com of commits.list){
      for(let a of com.authors)
        authors[a].list.push(com)
    }
    for(let a in authors){
      authors[a].n = authors[a].list.length
    }

    // setup authorsca[..].list
    for(let com of commits.list){
      if(com.authors.join('') == 'a')
        authorsca.a.list.push(com)
      else if(com.authors.join() == 'e')
        authorsca.e.list.push(com)
      else if(com.authors.join('') == 'm')
        authorsca.m.list.push(com)
      else if(com.authors.join('') == 'ae')
        authorsca.ae.list.push(com)
      else if(com.authors.join('') == 'aem' || com.authors.join() == 'ame')
        authorsca.aem.list.push(com)
      else
        authorsca.x.list.push(com)
    }
    for(let a in authorsca){
      authorsca[a].n = authorsca[a].list.length
    }

    /// si escludono dalle statistiche i commit con worktime=0
    // calculate statistic on commits
    commits = calcStats(commits)

    // calculate statistics on delivs
    for(let d in delivs){
      delivs[d] = calcStats(delivs[d])
    }

    // calculate statistics on authors
    for(let a in authors){
      authors[a] = calcStats(authors[a])
    }

    // calculate sums on authors
    for(let a in authors){
      for(let com of authors[a].list){
        authors[a].sums[toDeliv(com.branch)] += com.worktime
      }
    }


    // calculate statistics on authorsca
    for(let a in authorsca){
      authorsca[a] = calcStats(authorsca[a])
    }

    // calculate sums on authorsca
    for(let a in authorsca){
      for(let com of authorsca[a].list){
        authorsca[a].sums[toDeliv(com.branch)] += com.worktime
      }
    }

    const stats = {
      commits:commits,
      delivs:delivs,
      authors:authors,
      authorsca:authorsca
    }

    fs.writeFileSync('./stats.json', JSON.stringify(stats))
    await setTimeout(2000)
    process.exit()
  }

}