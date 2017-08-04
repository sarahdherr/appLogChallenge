'use strict'

const Sequelize = require('sequelize')
const db = require('../index.js')

module.exports = db.define('query_name', {
  QueryName: Sequelize.STRING
})
