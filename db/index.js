const Sequelize = require('sequelize')

const db = module.exports = new Sequelize('postgres://localhost:5432/sarah-herr-log-challenge', { logging: false })

require('./models')
