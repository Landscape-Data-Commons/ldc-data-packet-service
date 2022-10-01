'use strict'
import path from 'path'
import fs from 'fs'
import xml2js from 'xml2js'
import env from '../env'

import extractColumnDescriptions from '../parse/query-processor'

const XML_TEMPLATE_DIR = path.resolve(__dirname, '../xml-templates')
const XML_OUTPUT_DIR = path.resolve(__dirname, '../csv-data-files/metadata-files')

const PRESET_ELEMENT_VALUES = {
  ENTTYPDS: 'Producer Defined',
  ATTRDEFS: 'Producer Defined'
}

function addXmlEnttypeElement(xmlDetailedElement: any, tableName: any) {
  xmlDetailedElement.enttyp[0].enttypl = tableName
  xmlDetailedElement.enttyp[0].enttypds = PRESET_ELEMENT_VALUES.ENTTYPDS
}

function addXmlAttributeElements(xmlDetailedElement: any, xmlAttrElementCount: any, columnNameDescriptionString: any) {
  const [columnName, columnDescription] = columnNameDescriptionString.split(env.DELIMITER)
  if (xmlAttrElementCount === 0) {
    xmlDetailedElement.enttyp[0].attr = []
  }
  const attr = {
      'attrlabl': columnName,
      'attrdef': columnDescription,
      'attrdefs': PRESET_ELEMENT_VALUES.ATTRDEFS,
      'attrdomv': {
        'udom': ''
      }
    }
  xmlDetailedElement.enttyp[0].attr[xmlAttrElementCount] = attr
  //console.log(columnName)
  //console.log(columnDescription)
}

 async function generateMetadataXmlFile(tableName: any) {
  let columnDescriptions = await extractColumnDescriptions()
  let descriptions = columnDescriptions[tableName]
// 2022-09-24-CMF: Uncomment for testing
// if (tableName === 'dataGap') {
  // 2022-09-24-CMF: Keep creation of xml2jsParser in loop, as per xml2js recommendation (https://www.npmjs.com/package/xml2js#parsing-multiple-files)
  const xml2jsParser = new xml2js.Parser()
  const xmlTemplateName = (tableName === 'filterTable') ? 'geoIndicators.xml' : tableName + '.xml'

  fs.readFile(path.join(XML_TEMPLATE_DIR, xmlTemplateName), function(err, data) {
    // 2022-09-28-CMF: Added types for js-to-ts conversion
    //xml2jsParser.parseString(data, function (err, result) {
    xml2jsParser.parseString(data, (err: Error | null, result: any) => {

      
      if (err) console.log(err)

      const xmlDetailedElement = result.metadata.eainfo[0].detailed[0]
      addXmlEnttypeElement(xmlDetailedElement, tableName)
      let xmlAttrElementCount = 0
 
      for (let columnNameDescriptionString of descriptions) {
        addXmlAttributeElements(xmlDetailedElement, xmlAttrElementCount, columnNameDescriptionString)
        xmlAttrElementCount += 1
      }

      const xml2jsBuilder = new xml2js.Builder();
      const xml = xml2jsBuilder.buildObject(result);
      
      const outputFile = path.join(XML_OUTPUT_DIR, tableName + '.xml')
      console.log(outputFile)
      // fs.writeFileSync(outputFile, xml) 
    });
  });

//} 
}

 async function generateMetadataXmlFiles() {
  let columnDescriptions = await extractColumnDescriptions()

  for (let tableName in columnDescriptions) {
    await generateMetadataXmlFile(tableName, columnDescriptions[tableName])
  }
}

// 2022-09-27-CMF: Uncomment for testing
/*
generateMetadataXmlFiles()
  .catch((err) => console.log(err))
// process.exit()
*/
export default {
  generateMetadataXmlFiles,
  generateMetadataXmlFile
}