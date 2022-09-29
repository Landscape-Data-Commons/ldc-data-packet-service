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
const env_js_1 = __importDefault(require("../env.js"));
const queries_metadata_1 = __importDefault(require("../../database/queries-metadata"));
const csv_parser_1 = __importDefault(require("./csv-parser"));
function extractColumnDescriptions() {
    return __awaiter(this, void 0, void 0, function* () {
        let csvDataFileHeaders = yield (0, csv_parser_1.default)();
        const tableNames = Object.getOwnPropertyNames(csvDataFileHeaders);
        for (let tableName of tableNames) {
            const csvHeaderNames = csvDataFileHeaders[tableName];
            const dbTableName = (tableName === 'filterTable') ? 'geoIndicators' : tableName;
            const queryResults = yield (0, queries_metadata_1.default)(dbTableName);
            for (let queryResult of queryResults) {
                const indexOfColumnName = csvHeaderNames.indexOf(queryResult.column_name);
                if (indexOfColumnName >= 0) {
                    const columnDescription = (queryResult.column_description === null) ? '' : queryResult.column_description;
                    // 2022-09-24-CMF: Initial/final double quotes removed (https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string) 
                    csvHeaderNames[indexOfColumnName] =
                        csvHeaderNames[indexOfColumnName] + env_js_1.default.DELIMITER + columnDescription.replace(/^"(.*)"$/, '$1');
                }
            }
        }
        return csvDataFileHeaders;
    });
}
// 2022-09-26-CMF: Comment out when running diagnostics
/*
extractColumnDescriptions()
  .then((columnDescriptions: any) => { console.log(columnDescriptions) })
  .catch((err) => console.log(err))
*/
exports.default = extractColumnDescriptions;
