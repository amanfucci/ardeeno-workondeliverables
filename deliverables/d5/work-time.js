var spawn      = require('child_process').spawn
  , split2     = require('split2')
  , listStream = require('list-stream')
  , commitStream = require('commit-stream')

//Utility functions
function toDec(str){
  stro = str
  str = /\s*?(\d+:\d+)\s*?/g.exec(str)
  retval = 0.0
  console.log("=====================")
  
  if (str == null){
    retval = 0.0
  }
  else{
    console.log(str)
    str = str[0]
    if (str.split(':').length > 0)
      retval = parseFloat(str.split(':')[0])+parseFloat(str.split(':')[1]/60.0)
    else
      retval = 0.0
    console.log("->"+retval)
  }
  console.log(stro+"->"+retval)
  
  return retval
}
function emailToAuthor(email){
  switch(email){
    case "alessandro.manfucci@gmail.com":
    case "alessandro.manfucci@studenti.unitn.it":
    case "alessandro.manfucci@unitn.it":
    case "36966553+almanfu@users.noreply.github.com":
      return 'a';
    case 'enrico.cescato@studenti.unitn.it':
    case 'enrico.cescato@unitn.it':
      return 'e';
    case 'm.sottocornola-1@studenti.unitn.it':
    case 'm.sottocornola-1@unitn.it':
      return 'm';
  }
  return 'err'
}

authors = {
  'a':{
    'commits':[]
  },
  'e':{
    'commits':[]
  },
  'm':{
    'commits':[]
  }
}

branches = {
  'd1': [],
  'd2': [],
  'd3': [],
  'd4': [],
  'd5': []
}

allCommits = [];

b = 'd3'

// questa spawn va in qualche modo aspettata
spawn('bash', [ '-c', 'git log --all'])
.stdout.pipe(split2())
.pipe(commitStream('rvagg', 'commit-stream'))
.pipe(listStream.obj((err, list) =>{//questa liststream cosa fa estattamente?
  //Get commits from git log
  list.forEach(commit => {
    emailAuthor = commit.author.email
    
    var cleaned_commit = {}
    cleaned_commit.sha = commit.sha
    cleaned_commit.authors = [emailToAuthor(emailAuthor)]
    cleaned_commit.authorDate = commit.authorDate
    cleaned_commit.worktime = toDec(commit.summary)+toDec(commit.description)
    cleaned_commit.branch = b

    if(commit.description != null){
      coauthors = commit.description.length <= 1 ? [] : commit.description.slice(1);
      for(s of coauthors){
        str = /<([~<>]*)>/g.exec(s)
        if(str == null)
          return ''
        else
          cleaned_commit.authors.push(emailToAuthor(str[0]))
      }
    }

    //authors[emailToAuthor(emailAuthor)]['commits'].push(cleaned_commit)
    //branches[b].push(cleaned_commit)
    allCommits.push(cleaned_commit)  
  });
  var min=100
  var max=0
  var n = allCommits.length
  var sum = 0.0
  console.log(allCommits)
  for(comm of allCommits){
    sum += comm.worktime
    min = comm.worktime < min && comm.worktime != 0 ? comm.worktime : min;
    max = comm.worktime > max ? comm.worktime : max;
  }
  var eval = sum/n
  var sd2 = 0.0
  for(comm of allCommits){
    sd2 += (comm.worktime-eval)**2
  }
  sd2 = sd2/(n-1)
  console.log('n='+n)
  console.log('sum='+sum)
  console.log('min='+min)
  console.log('max='+max)
  console.log(eval)
  console.log(sd2)
}))