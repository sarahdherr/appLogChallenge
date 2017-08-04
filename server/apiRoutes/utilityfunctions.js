const QueryDatabase = require('../../db/models/query_database')
const QueryExecution = require('../../db/models/query_execution')
const QueryName = require('../../db/models/query_name')
const Promise = require('bluebird')

function findName (str) {
  var arr = str ? str.split(' ') : ''
  return arr[arr.length - 1]
}

function getQueryLines (arrOfLines) {
  return arrOfLines.filter(line => line[3] === 'INFO')
}

function parseLogInfo(largeString) {
  var lineArr = []
  largeString.split('\n').forEach(str => {
    var line = str.split('|').map(item => item.trim())
    lineArr.push(line)
  })
  filteredArr = getQueryLines(lineArr)
  return makeLineObjects(filteredArr)
}



function makeLineObjects (arrOfLines) {
  const final = []
  arrOfLines.forEach(line => {
    let obj1 = {}, obj2 = {}, obj3 = {}
    obj1['ExecutionDateTime'] = line[0]
    obj1['ExecutionSpeed'] = line[4]
    obj2['DatabaseType'] = line[5]
    obj2['DatabaseFileName'] = line[6]
    obj3['QueryName'] = findName(line[7])
    final.push([obj1, obj2, obj3])
  })
  return final
}

function dbCreate (arrOfData) {

  const arrOfCreates = []
  arrOfData.forEach(lineArr => {
    let dbFill = Promise.all([QueryName.create(lineArr[2]), QueryDatabase.create(lineArr[1])])
    .spread((name, db) => {
      let execution = QueryExecution.create(lineArr[0])
      .then(exec => {
        // Just realized my associations are not being set as I expected, will iron this out by 3
        // execution.addQueryName(name)
        // execution.addQueryDatabase(db)
      })
    })

    arrOfCreates.concat([
      dbFill
    ])

  })
  return arrOfCreates
}

module.exports = {parseLogInfo, dbCreate}
