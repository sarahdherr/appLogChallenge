'use strict'
const db = require('./db')

// syncs the database, then starts the server
db.sync({force: true})
  .then(() => console.log('Sequelize models synced to PostgresSQL'))
  .then(() => require('./server'))
  .catch(err => console.log(err))
