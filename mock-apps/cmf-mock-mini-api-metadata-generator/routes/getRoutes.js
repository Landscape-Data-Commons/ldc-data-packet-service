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
exports.router = void 0;
const pg_1 = __importDefault(require("pg"));
const express_1 = __importDefault(require("express"));
const loginInfo_js_1 = require("../database/loginInfo.js");
const queries_js_1 = require("../database/queries.js");
const router = express_1.default.Router();
exports.router = router;
const pool = new pg_1.default.Pool(loginInfo_js_1.loginInfo);
const queryGenerator = new queries_js_1.QueryGenerator();
const delimiter = /,(?!\s)/;
// 2022-02-15-CMF: Handle errors from the database connection pool
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
// 2022-02-15-CMF: Used for all responses
function setHeaderFields(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}
// 2022-02-15-CMF: Used to parse and extract query parameters from all requests 
function extractQueryParameters(request) {
    const queryParameters = {};
    // console.log(request.query)
    for (let property in request.query) {
        queryParameters[property] = request.query[property].split(delimiter);
    }
    //console.log(queryParameters)
    return queryParameters;
}
// 2022-02-15-CMF: Used to query database for each request
function getResult(selectStatement) {
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
// 2022-02-15-CMF: Used for initially populating plot markers on web-portal map (also returns PrimaryKey)
//                 See Postman tests for examples
router.get('/geoindicators/latitude-longitude', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        // 2022-02-10-CMF: Query parameters added for Postman testing
        response.status(200).json(yield getResult(queryGenerator.selectLatLonRounded(extractQueryParameters(request))));
    }
    catch (err) {
        console.log(err);
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all data for filter (i.e., selector/indicator) requests;
//                 includes only query parameter for PrimaryKey values (e.g., from polygon selection)
//                 See Postman tests for examples
router.get('/geoindicators/all-filter-columns', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllFilterColumns(extractQueryParameters(request))));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used for filter (i.e., selector/indicator) requests with restrictions; includes
//                 query parameters for combinations of filters 
//                 See Postman tests for examples
router.get('/geoindicators/adjusted-filter-columns', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAdjustedFilterColumns(extractQueryParameters(request))));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve PrimaryKey values stored on client for row-restricted processing
//                 See Postman tests for examples
router.get('/geoindicators/adjusted-filter-columns/primary-keys-only', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectPrimaryKeysForAdjustedFilterColumns(extractQueryParameters(request))));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for geoindicators table using PrimaryKey values
//                 See Postman tests for examples
router.get('/geoindicators', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'geoIndicators')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for geoSpecies table using PrimaryKey values
//                 See Postman tests for examples
router.get('/geospecies', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'geoSpecies')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for dataSpeciesInventory table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-species-inventory', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataSpeciesInventory')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for dataLPI table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-lpi', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataLPI')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for dataGap table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-gap', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataGap')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for dataHeight table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-height', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataHeight')));
    }
    catch (err) {
        next();
    }
}));
// 2022-02-16-CMF: Used to retrieve all column values for dataSoilStability table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-soil-stability', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        setHeaderFields(response);
        response.status(200).json(yield getResult(queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataSoilStability')));
    }
    catch (err) {
        next();
    }
}));
