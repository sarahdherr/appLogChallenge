'use strict'
// routes mounted off `/api/test`
const router = require('express').Router()
const dummydata = require('./dummydata')
const { parseLogInfo, dbCreate } = require('./utilityfunctions.js')

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
