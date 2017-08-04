'use strict'
// routes mounted off `/api/test`
const router = require('express').Router()
const fs = require('fs')
const dummydata = require('./dummydata')
const QueryDatabase = require('../../db/models/query_database')
const QueryExecution = require('../../db/models/query_execution')
const QueryName = require('../../db/models/query_name')
const { parseLogInfo, dbCreate } = require('./utilityfunctions.js')
const Promise = require('bluebird')

router.get('/read', function (req, res, next) {
  const arrOfData = parseLogInfo(dummydata)
  const arrOfCreates = dbCreate(arrOfData)
  // const arrOfCreates = []
  // arrOfData.forEach(lineArr => {
  //   let dbFill = Promise.all([QueryName.create(lineArr[2]), QueryDatabase.create(lineArr[1])])
  //                   .spread((name, db) => {
  //                     let execution = QueryExecution.create(lineArr[0])
  //                     .then(exec => {
  //                       // Just realized my associations are not being set as I expected, will iron this out by 3
  //                       execution.addQueryName(name)
  //                       execution.addQueryDatabase(db)
  //                     })
  //                   })
  //
  //   arrOfCreates.concat([
  //     dbFill
  //   ])
  //
  // })
  Promise.all(arrOfCreates)
  .then(res.send(arrOfData))

})

router.get('/lines', function (req, res, next) {
  // var lineReader = require('line-reader')
  // lineReader.eachLine('/app.log', function (line, last) {
  //   console.log(line)
  //   if (last) {
  //     res.send({done: true})
  //   }
  // })
})

module.exports = router
