import json
import matplotlib.pyplot as plt
import dateparser
from scipy.stats import linregress
from matplotlib.pyplot import figure
import pandas as pd


def auth_col(authors):
  if (authors == ['a']):
    return 'b'
  elif (authors == ['e']):
    return 'g'
  elif (authors == ['m']):
    return 'r'
  else:# => co-authoring
    return 'k'

def col_auth(col):
  if(col == 'b'):
    return 'alessandro'
  elif(col == 'g'):
    return 'enrico'
  elif(col == 'r'):
    return 'matteo'
  elif(col == 'k'):
    return 'co-auth'

def linregr_fun(xp, yp):
    lr = linregress(xp, yp)
    print(lr.slope, lr.intercept)
    return lambda x: lr.slope*x+lr.intercept

stats = json.load(open('./stats.json', 'r'))

# PRINT GRAPH
sum = stats['commits']['sum']

xp0 = []
yp0 = []
cols0 = []

xp = []
yp = []
yp_sum = []
cols = []

xp_ts = []

for com in sorted(stats['commits']['list'], key=lambda e: e['authorDate']):
  com['authorDate'] = dateparser.parse(com['authorDate'])

  if(com['worktime'] > 0):
    xp.append(com['authorDate'].date())
    xp_ts.append(com['authorDate'].timestamp())

    yp.append(com['worktime'])
    cols.append(auth_col(com['authors']))
    yp_sum.append(yp_sum[-1]+com['worktime'] if len(yp_sum)!=0 else com['worktime'] )
  else:
    xp0.append(com['authorDate'].date())
    yp0.append(com['worktime'])
    cols0.append(auth_col(com['authors']))


  
fig, ax = plt.subplots()

fig.set_size_inches(16./2., 9./2.)

plt.ylabel('work-time[hrs]')

# plotting commits
for col in ['b', 'g', 'r', 'k']:
  ax.scatter(
    [xp[i] for i in range(len(xp)) if cols[i] == col],
    [yp[i] for i in range(len(yp)) if cols[i] == col],
    c=col, alpha=0.8, label=col_auth(col))

ax.legend(title="Colors")

# plotting lines
## D1
plt.plot([
  dateparser.parse('2022-10-10').date(),
  dateparser.parse('2022-10-10').date()], [0, 20], c='k', alpha=0.5)
## D2
plt.plot([
  dateparser.parse('2022-11-09').date(),
  dateparser.parse('2022-11-09').date()], [0, 20], c='k', alpha=0.5)
## D3
plt.plot([
  dateparser.parse('2022-12-02').date(),
  dateparser.parse('2022-12-02').date()], [0, 20], c='k', alpha=0.5)
## D4
plt.plot([
  dateparser.parse('2022-12-22').date(),
  dateparser.parse('2022-12-22').date()], [0, 20], c='k', alpha=0.5)
## SCADENZA FINALE
plt.plot([
  dateparser.parse('2023-01-02').date(),
  dateparser.parse('2023-01-02').date()], [0, 20], c='k', alpha=0.5)


# plotting commits with 0 worktime
plt.scatter(xp0, yp0, c=cols0, s=10, alpha=0.8)

# plotting linear regression
lr = linregr_fun(xp_ts, yp)
plt.plot([min(xp), max(xp)], [lr(min(xp_ts)), lr(max(xp_ts))])

# partial sums
plt.plot(xp, [y*20/sum for y in yp_sum])

plt.grid(visible=True)
plt.savefig('stats', dpi=300)