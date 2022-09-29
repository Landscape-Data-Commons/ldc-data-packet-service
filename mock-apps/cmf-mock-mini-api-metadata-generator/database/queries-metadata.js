"use strict";
// https://node-postgres.com/features/pooling
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
const pg_1 = __importDefault(require("pg"));
const loginInfo_js_1 = require("./loginInfo.js");
const pool = new pg_1.default.Pool(loginInfo_js_1.loginInfo);
// 2022-09-23-CMF: Handle errors from the database connection pool (code from mini-API)
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
// 2022-09-23-CMF: Query database for each request (code from mini-API)
function getQueryResult(selectStatement) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        const client = yield pool.connect();
        try {
            result = (yield client.query(selectStatement)).rows;
        }
        finally {
            client.release();
        }
        ;
        return result;
    });
}
function getColumnDescriptions(dbTableName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getQueryResult(`SELECT t."Field" as column_name, t."Description" as column_description
     FROM public_test."tblSchema" t
     WHERE t."Table" = '${dbTableName}'`);
    });
}
exports.default = getColumnDescriptions;
