import getColumnDescriptions from '../../database/queries-metadata'
import getCsvDataFileHeaders from './csv-parser.js'

async function printTblSchemaFieldsNotInCsvColumnHeaders() {

  let csvDataFileHeaders: any = await getCsvDataFileHeaders()
  const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders)

  console.log('Database tblSchema fields not in CSV file headers:')

  for (let tableName of tableNames) {
    if (tableName === 'filterTable') continue

    const csvHeaderNames = csvDataFileHeaders[tableName]
    const queryResults = await getColumnDescriptions(tableName)

    for (let queryResult of queryResults) {
      
      if (csvHeaderNames.indexOf(queryResult.column_name) < 0) {
        console.log(tableName + ': ' + queryResult.column_name) 
      }

    }
  }
}

async function printCsvColumnHeadersNotInTblSchemaFields() {
  let csvDataFileHeaders: any = await getCsvDataFileHeaders()
  const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders)

  console.log('\n\nCSV column headers not in tblSchema:')

  for (let tableName of tableNames) {
    if (tableName === 'filterTable') continue
    const csvHeaderNames = csvDataFileHeaders[tableName]
    const queryResults = await getColumnDescriptions(tableName)
    const queryResultColumnNames = []

    for (let queryResult of queryResults) {
      queryResultColumnNames.push(queryResult.column_name)
    }

    for (let csvHeaderName of csvHeaderNames) {
      if (queryResultColumnNames.indexOf(csvHeaderName) < 0) {
        console.log(tableName + ': ' + csvHeaderName)
      }
    }
  }
}

//printTblSchemaFieldsNotInCsvColumnHeaders().catch(console.error)
//printCsvColumnHeadersNotInTblSchemaFields().catch(console.error)

export default printCsvColumnHeadersNotInTblSchemaFields