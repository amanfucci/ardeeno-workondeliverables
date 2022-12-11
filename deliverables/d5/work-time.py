import json
import matplotlib.pyplot as plt
import dateparser
from scipy.stats import linregress


def linregr_fun(xp, yp):
    lr = linregress(xp, yp)
    print(lr.slope, lr.intercept)
    return lambda x: lr.slope*x+lr.intercept

data = json.load(open('allCommits.json', 'r'))
allCommits = []
xp = []
xp_ts = []
yp = []
yp_sum = []
allSum = 0
for commit in reversed(data['allCommits']):
  commit['authorDate'] = dateparser.parse(commit['authorDate'])
  allCommits.append(commit)
  xp.append(commit['authorDate'].date())
  xp_ts.append(commit['authorDate'].timestamp())
  allSum += commit['worktime']
  yp.append(commit['worktime'])
  yp_sum.append(yp_sum[-1]+commit['worktime'] if len(yp_sum)!=0 else commit['worktime'] )
fig, ax = plt.subplots()

plt.ylabel('work-time')

plt.scatter(xp, yp)

# plotting linear regression
lr = linregr_fun(xp_ts, yp)
plt.plot([min(xp), max(xp)], [lr(min(xp_ts)), lr(max(xp_ts))])

# partial sums
plt.plot(xp, [y*20/allSum for y in yp_sum])

plt.grid(visible=True)
plt.savefig('work-time')