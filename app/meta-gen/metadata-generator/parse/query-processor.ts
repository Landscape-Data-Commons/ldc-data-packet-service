import env from '../env'
import getColumnDescriptions from '../../database/queries-metadata'
import getCsvDataFileHeaders from './csv-parser'

async function extractColumnDescriptions() {
  let csvDataFileHeaders: any = await getCsvDataFileHeaders()
  const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders)
  
  for (let tableName of tableNames) {
    const csvHeaderNames = csvDataFileHeaders[tableName]
    const dbTableName = (tableName === 'filterTable') ? 'geoIndicators' : tableName
    const queryResults = await getColumnDescriptions(dbTableName)

    for (let queryResult of queryResults) {
      const indexOfColumnName = csvHeaderNames.indexOf(queryResult.column_name)
      
      if (indexOfColumnName >= 0) {
        const columnDescription = (queryResult.column_description === null) ? '' : queryResult.column_description
        // 2022-09-24-CMF: Initial/final double quotes removed (https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string) 
        csvHeaderNames[indexOfColumnName] = 
          csvHeaderNames[indexOfColumnName] + env.DELIMITER + columnDescription.replace(/^"(.*)"$/, '$1')
      }
    }
  }
  return csvDataFileHeaders
}

// 2022-09-26-CMF: Comment out when running diagnostics
/*
extractColumnDescriptions()
  .then((columnDescriptions: any) => { console.log(columnDescriptions) })
  .catch((err) => console.log(err))
*/
export default extractColumnDescriptions