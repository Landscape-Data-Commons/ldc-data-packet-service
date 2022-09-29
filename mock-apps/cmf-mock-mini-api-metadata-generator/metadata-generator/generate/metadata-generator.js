'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = __importDefault(require("xml2js"));
const env_js_1 = __importDefault(require("../env.js"));
const query_processor_js_1 = __importDefault(require("../parse/query-processor.js"));
const XML_TEMPLATE_DIR = path_1.default.resolve(__dirname, '../xml-templates');
const XML_OUTPUT_DIR = path_1.default.resolve(__dirname, '../csv-data-files/metadata-files');
const PRESET_ELEMENT_VALUES = {
    ENTTYPDS: 'Producer Defined',
    ATTRDEFS: 'Producer Defined'
};
function addXmlEnttypeElement(xmlDetailedElement, tableName) {
    xmlDetailedElement.enttyp[0].enttypl = tableName;
    xmlDetailedElement.enttyp[0].enttypds = PRESET_ELEMENT_VALUES.ENTTYPDS;
}
function addXmlAttributeElements(xmlDetailedElement, xmlAttrElementCount, columnNameDescriptionString) {
    const [columnName, columnDescription] = columnNameDescriptionString.split(env_js_1.default.DELIMITER);
    if (xmlAttrElementCount === 0) {
        xmlDetailedElement.enttyp[0].attr = [];
    }
    const attr = {
        'attrlabl': columnName,
        'attrdef': columnDescription,
        'attrdefs': PRESET_ELEMENT_VALUES.ATTRDEFS,
        'attrdomv': {
            'udom': ''
        }
    };
    xmlDetailedElement.enttyp[0].attr[xmlAttrElementCount] = attr;
    //console.log(columnName)
    //console.log(columnDescription)
}
function generateMetadataXmlFile(tableName, columnNameDescriptionStrings) {
    return __awaiter(this, void 0, void 0, function* () {
        // 2022-09-24-CMF: Uncomment for testing
        // if (tableName === 'dataGap') {
        // 2022-09-24-CMF: Keep creation of xml2jsParser in loop, as per xml2js recommendation (https://www.npmjs.com/package/xml2js#parsing-multiple-files)
        const xml2jsParser = new xml2js_1.default.Parser();
        const xmlTemplateName = (tableName === 'filterTable') ? 'geoIndicators.xml' : tableName + '.xml';
        fs_1.default.readFile(path_1.default.join(XML_TEMPLATE_DIR, xmlTemplateName), function (err, data) {
            // 2022-09-28-CMF: Added types for js-to-ts conversion
            //xml2jsParser.parseString(data, function (err, result) {
            xml2jsParser.parseString(data, (err, result) => {
                if (err)
                    console.log(err);
                const xmlDetailedElement = result.metadata.eainfo[0].detailed[0];
                addXmlEnttypeElement(xmlDetailedElement, tableName);
                let xmlAttrElementCount = 0;
                for (let columnNameDescriptionString of columnNameDescriptionStrings) {
                    addXmlAttributeElements(xmlDetailedElement, xmlAttrElementCount, columnNameDescriptionString);
                    xmlAttrElementCount += 1;
                }
                const xml2jsBuilder = new xml2js_1.default.Builder();
                const xml = xml2jsBuilder.buildObject(result);
                const outputFile = path_1.default.join(XML_OUTPUT_DIR, tableName + '.xml');
                fs_1.default.writeFileSync(outputFile, xml);
            });
        });
        //} 
    });
}
function generateMetadataXmlFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        let columnDescriptions = yield (0, query_processor_js_1.default)();
        for (let tableName in columnDescriptions) {
            yield generateMetadataXmlFile(tableName, columnDescriptions[tableName]);
        }
    });
}
// 2022-09-27-CMF: Uncomment for testing
/*
generateMetadataXmlFiles()
  .catch((err) => console.log(err))
// process.exit()
*/
exports.default = generateMetadataXmlFiles;
