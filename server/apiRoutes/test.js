'use strict'
// routes mounted off `/api/test`
const router = require('express').Router()
const dummydata = require('./dummydata')
const { parseLogInfo, dbCreate } = require('./utilityfunctions.js')

// route to show the section of data and also send it to the database
// NOTE: I realize that using a GET route was not the exact right choice, POST would have been better. This started as just a way to test it out with and I ran out of time to refactor
router.get('/read', function (req, res, next) {
  const arrOfData = parseLogInfo(dummydata)
  const arrOfCreates = dbCreate(arrOfData)
  
  Promise.all(arrOfCreates)
  .then(res.send(arrOfData))

})

// was trying out some npm's
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
