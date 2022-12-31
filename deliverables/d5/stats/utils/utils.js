const toDec = (str) => {
  stro = str
  str = /\s*?(\d+:\d+)\s*?/g.exec(str)
  retval = 0.0
  if (str == null){
    retval = 0.0
  }
  else{
    str = str[0]
    if (str.split(':').length > 0)
      retval = parseFloat(str.split(':')[0])+parseFloat(str.split(':')[1]/60.0)
    else
      retval = 0.0
  }
  return retval
}

const emailToAuthor = (email) => {
  switch(email){
    case "alessandro.manfucci@gmail.com":
    case "alessandro.manfucci@studenti.unitn.it":
    case "alessandro.manfucci@unitn.it":
    case "36966553+almanfu@users.noreply.github.com":
      return 'a';
    case 'enrico.cescato@studenti.unitn.it':
    case 'enrico.cescato@unitn.it':
    case '106173615+Cesc01@users.noreply.github.com':
      return 'e';
    case 'm.sottocornola-1@studenti.unitn.it':
    case 'm.sottocornola-1@unitn.it':
      return 'm';
  }
  //console.log(email)
  return email
}

const branches = ['d1', 'd2', 'd3', 'd4', 'd5', 'pm']

const repos = ['be', 'fe', 'dl']

module.exports = {
  toDec:toDec,
  emailToAuthor:emailToAuthor,
  branches: branches,
  repos: repos
}