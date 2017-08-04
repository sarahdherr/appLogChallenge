'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js')

module.exports = db.define('query_database', {
  DatabaseType: Sequelize.STRING,
  DatabaseFileName: Sequelize.STRING
})
