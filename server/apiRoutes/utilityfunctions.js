const QueryDatabase = require('../../db/models/query_database')
const QueryExecution = require('../../db/models/query_execution')
const QueryName = require('../../db/models/query_name')
const Promise = require('bluebird')

// PARSING UTILITY FUNCTION
// NOTE: I should have done this more dynamically with regex, but in the time crunch fell back on what I was comfortable with.

// HELPER FUNCTIONS
// this function finds the QueryName in the line
function findName (str) {
  var arr = str ? str.split(' ') : ''
  return arr[arr.length - 1]
}

// this function only returns lines that have the INFO field
function getQueryLines (arrOfLines) {
  return arrOfLines.filter(line => line[3] === 'INFO')
}

// This function takes the data in the array form and creates an object that can be used to send to the database
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

// EXPORT FUNCTION
function parseLogInfo(largeString) {
  var lineArr = []
  largeString.split('\n').forEach(str => {
    var line = str.split('|').map(item => item.trim())
    lineArr.push(line)
  })
  filteredArr = getQueryLines(lineArr)
  return makeLineObjects(filteredArr)
}

// DATABASE UTILITY FUNCTION
// In the future, it would be better if this was more flexible to work with whatever data is coming in and whatever models I needed.

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
