'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js')

module.exports = db.define('query_execution', {
  ExecutionDateTime: Sequelize.DATE,
  ExecutionSpeed: Sequelize.STRING
})
