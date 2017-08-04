'use strict'

const QueryDatabase = require('./query_database')
const QueryExecution = require('./query_execution')
const QueryName = require('./query_name')

// Participant.belongsTo(Message)

QueryExecution.belongsTo(QueryName)
QueryExecution.belongsTo(QueryDatabase)

module.exports = {QueryDatabase, QueryExecution, QueryName}
