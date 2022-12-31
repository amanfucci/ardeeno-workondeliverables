const fs = require('fs')
const { setTimeout } = require('timers/promises')
const exp = require('./export')
const assign = require('./assign')
const analyze = require('./analyze');

(async()=>{
  exp()
  await setTimeout(3000)
  assign()
  await setTimeout(1000)
  await analyze()
  await setTimeout(2000)
  const stats = JSON.parse(fs.readFileSync('./stats.json').toString())

  console.log(stats.authorsca.m.list);

  await setTimeout(2000)
  //process.exit()
})()


/* find unmatched work time from excel worktimes
  let myCom = stats.authors.a.list.filter(com =>
    ['d2'].includes(com.branch) && com.worktime > 0)
  const xlWorktimes = [1, 3.5, 8.5, 3.5, 1.5, 4, 1, 2.5, 3.5, 2, 1.5, 0.5, 1.5, 7.5, 8, 3.5, 4.5]
  console.log('situation')
  console.log('excel=', xlWorktimes, ' -- ', xlWorktimes.length)
  console.log('app=', myCom.map(c=>c.worktime), ' -- ', myCom.length)


  for(let i in xlWorktimes){
    const wt = xlWorktimes[i]
    let index = myCom.findIndex(e => e?.worktime === wt)
    console.log(index);
    if(index != -1){
      delete xlWorktimes[i]
      delete myCom[index]
    }
  }
  console.log('after matching');
  console.log('excel=', xlWorktimes, ' -- ')
  console.log('app=', myCom.map(c=>c?.worktime), ' -- ')
  console.log(myCom)


*/