"use strict";
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
const queries_metadata_1 = __importDefault(require("../../database/queries-metadata"));
const csv_parser_js_1 = __importDefault(require("./csv-parser.js"));
function printTblSchemaFieldsNotInCsvColumnHeaders() {
    return __awaiter(this, void 0, void 0, function* () {
        let csvDataFileHeaders = yield (0, csv_parser_js_1.default)();
        const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders);
        console.log('Database tblSchema fields not in CSV file headers:');
        for (let tableName of tableNames) {
            if (tableName === 'filterTable')
                continue;
            const csvHeaderNames = csvDataFileHeaders[tableName];
            const queryResults = yield (0, queries_metadata_1.default)(tableName);
            for (let queryResult of queryResults) {
                if (csvHeaderNames.indexOf(queryResult.column_name) < 0) {
                    console.log(tableName + ': ' + queryResult.column_name);
                }
            }
        }
    });
}
function printCsvColumnHeadersNotInTblSchemaFields() {
    return __awaiter(this, void 0, void 0, function* () {
        let csvDataFileHeaders = yield (0, csv_parser_js_1.default)();
        const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders);
        console.log('\n\nCSV column headers not in tblSchema:');
        for (let tableName of tableNames) {
            if (tableName === 'filterTable')
                continue;
            const csvHeaderNames = csvDataFileHeaders[tableName];
            const queryResults = yield (0, queries_metadata_1.default)(tableName);
            const queryResultColumnNames = [];
            for (let queryResult of queryResults) {
                queryResultColumnNames.push(queryResult.column_name);
            }
            for (let csvHeaderName of csvHeaderNames) {
                if (queryResultColumnNames.indexOf(csvHeaderName) < 0) {
                    console.log(tableName + ': ' + csvHeaderName);
                }
            }
        }
    });
}
//printTblSchemaFieldsNotInCsvColumnHeaders().catch(console.error)
//printCsvColumnHeadersNotInTblSchemaFields().catch(console.error)
exports.default = printCsvColumnHeadersNotInTblSchemaFields;
