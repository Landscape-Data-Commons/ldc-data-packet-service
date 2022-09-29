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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
// // 2022-09-23-CMF: For testing 
//console.log(path.dirname(require.main.filename))
const CSV_DATA_FILES_DIR = path_1.default.resolve(__dirname, '../csv-data-files');
// 2022-09-23-CMF: Get headers using promisified csv-parser file stream
function getCsvDataTableHeaders(dataDir, csvDataFilename) {
    const csvDataFileStream = fs_1.default.createReadStream(path_1.default.join(dataDir, csvDataFilename));
    let csvDataFileHeaders;
    csvDataFileStream
        // @ts-ignore
        .pipe((0, csv_parser_1.default)())
        .on('headers', (headers) => {
        csvDataFileHeaders = headers;
    });
    return new Promise((resolve, reject) => {
        csvDataFileStream.on('end', () => resolve(csvDataFileHeaders));
        csvDataFileStream.on('error', reject);
    });
}
function getCsvDataFileHeaders() {
    return __awaiter(this, void 0, void 0, function* () {
        // 2022-09-27-CMF: Removed due to JavaScript/Node/TypeScript incompatibility
        // const dataDir = env.CSV_DATA_FILES_DIR
        const dataDir = CSV_DATA_FILES_DIR;
        const csvDataFileHeaders = {};
        for (let filename of fs_1.default.readdirSync(dataDir).filter((f) => /\.csv$/.test(f))) {
            // @ts-ignore
            csvDataFileHeaders[filename.split('.')[0]] = yield getCsvDataTableHeaders(dataDir, filename);
        }
        return csvDataFileHeaders;
    });
}
// 2022-09-23-CMF: Uncomment for testing this file (csv-parser.js/.ts)
/*
getCsvDataFileHeaders()
  .then((csvDataFileHeaders: any) => { console.log(csvDataFileHeaders) })
  .catch((err) => console.log(err))

*/
exports.default = getCsvDataFileHeaders;
