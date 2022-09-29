"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryGenerator = void 0;
const columns = __importStar(require("./columns.js"));
;
// 2022-02-16-CMF: Used for processing requests and submitting database queries
class QueryGenerator {
    constructor() { }
    // 2022-02-16-CMF: Returns a min/max query condition from min/max query-parameter values
    getQueryMinMaxCondition(queryParameterName, queryParameterValues) {
        const [min, max] = queryParameterValues;
        const columnName = columns.filterQueryParametersToColumns[queryParameterName];
        return `gi."${columnName}" >= ${parseFloat(min)} \nAND\n gi."${columnName}" <= ${parseFloat(max)}`;
    }
    // 2022-02-16-CMF: Returns a comma-delimited query condition
    getQueryList(values) {
        return '(\'' + values.join('\', \'') + '\')';
    }
    // 2022-02-16-CMF: Returns a comma-delimited list of table-column names
    concatColumnNames(columnNames) {
        return `gi."` + columnNames.join(`",\n gi."`) + '" ';
    }
    // 2022-02-16-CMF: Returns unique elements in an array;
    //                reduces ecological-site parameter requests to single EcologicalSiteId column
    getUniqueElements(array) {
        const uniqueElements = [];
        for (let element of array) {
            if (!uniqueElements.includes(element)) {
                uniqueElements.push(element);
            }
        }
        return uniqueElements;
    }
    // 2022-02-16-CMF: Returns column names corresponding to query-parameter names
    getColumnNames(queryParameterNames) {
        let columnNames = [];
        for (let queryParameterName of queryParameterNames) {
            columnNames.push(columns.filterQueryParametersToColumns[queryParameterName]);
        }
        return this.getUniqueElements(columnNames);
    }
    // 2022-02-16-CMF: Returns column-name list for query parameters
    getFilterColumnString(queryParameterNames) {
        let filterColumnString = queryParameterNames ?
            this.concatColumnNames(this.getColumnNames(queryParameterNames)) :
            this.concatColumnNames(this.getUniqueElements(Object.values(columns.filterQueryParametersToColumns)));
        return filterColumnString;
    }
    // 2022-02-16-CMF: Returns latitude/longitude selection --- for showing all plots on initial map load
    getRoundedLatLonSubClause() {
        // 2022-05-01-CMF: Added CAST() to accommodate change from NUMERIC type for lat/lon values in old schema to DOUBLE PRECISION in new schema
        /* 2022-07-25-CMF: Removed CAST after Kris changed lat/lon values to numeric in new database (in public_dev.geoIndicators)
        return `\n ROUND( CAST(gi."Latitude_NAD83" AS NUMERIC), 8) as "Latitude_NAD83",` +
               `\n ROUND( CAST(gi."Longitude_NAD83" AS NUMERIC), 8) as "Longitude_NAD83"`
        */
        return `\n ROUND( gi."Latitude_NAD83", 8) as "Latitude_NAD83",` +
            `\n ROUND( gi."Longitude_NAD83", 8) as "Longitude_NAD83"`;
    }
    // 2022-02-16-CMF: Returns full query for retrieving latitude/longitude values on initial map load
    // 2022-02-10-CMF: Query parameters added for Postman testing
    selectLatLonRounded(limitQueryParameter) {
        let limit = Object.keys(limitQueryParameter).length ?
            'LIMIT ' + limitQueryParameter['limit'][0] : '';
        const query = `SELECT gi."PrimaryKey",
                   ${this.getRoundedLatLonSubClause()}
                   FROM public_dev."geoIndicators_view" gi
                   ${limit};`;
        return query;
    }
    // 2022-02-16-CMF: Returns primary query used for filter requests
    selectAllFilterColumns(primaryKeyQueryParameter) {
        const query = `SELECT ${this.getFilterColumnString()}, ${this.getRoundedLatLonSubClause()}
                    FROM public_dev."geoIndicators_view" gi
                    WHERE gi."PrimaryKey" IN ${this.getQueryList(primaryKeyQueryParameter.primaryKeys)}
                    ORDER BY gi."PrimaryKey";`;
        return query;
    }
    // 2022-02-16-CMF: Tests for selector type (e.g., date)
    isSelectorQueryParameter(queryParameterName) {
        return columns.selectorQueryParameters.includes(queryParameterName) ? true : false;
    }
    // 2022-02-16-CMF: Tests for selector type (e.g., linePointIntercept)
    isIndicatorQueryParameter(queryParameterName) {
        return columns.indicatorQueryParameters.includes(queryParameterName) ? true : false;
    }
    // 2022-02-16-CMF: Returns where condition for EcologicalSiteId; screens for different site-id lengths
    getEcologicalSiteIDWhereRegexCondition(queryParameterValues, tenCharRegexCount, elevenCharRegexCount) {
        let ecologicalSiteIDWhereConditionString = '';
        let tenCharFirstRegex = '\'^[A-Z0-9]{10}$\'';
        let elevenCharFirstRegex = '\'^[A-Z0-9]{11}$\'';
        let regexConditionStart = 'gi."EcologicalSiteId" ~ ';
        let tenCharRegexPrefix = '^';
        let tenCharRegexString = '';
        let elevenCharRegexPrefix = '^.';
        let elevenCharRegexString = '';
        let quote = '\'';
        if (tenCharRegexCount && elevenCharRegexCount) {
            tenCharRegexPrefix = elevenCharRegexPrefix;
            tenCharRegexCount = '{' + tenCharRegexCount + '}';
            elevenCharRegexCount = '{' + elevenCharRegexCount + '}';
        }
        for (let queryParameterValue of queryParameterValues) {
            tenCharRegexString +=
                tenCharRegexPrefix + tenCharRegexCount + queryParameterValue + '|';
            elevenCharRegexString +=
                elevenCharRegexPrefix + elevenCharRegexCount + queryParameterValue + '|';
        }
        ecologicalSiteIDWhereConditionString +=
            '(' + regexConditionStart + tenCharFirstRegex + ' AND ' + regexConditionStart
                + quote + tenCharRegexString.replace(/\|$/g, '') + quote + ')'
                + '\nOR\n' +
                '(' + regexConditionStart + elevenCharFirstRegex + ' AND ' + regexConditionStart
                + quote + elevenCharRegexString.replace(/\|$/g, '') + quote + ')';
        return ecologicalSiteIDWhereConditionString;
    }
    // 2022-02-16-CMF: Returns where condition specific to EcologicalSiteId subcode
    getEcologicalSiteWhereConditionExtension(queryParameterName, queryParameterValues) {
        let tenCharRegexCount = '';
        let elevenCharRegexCount = '';
        switch (queryParameterName) {
            case 'ecologicalSiteId':
                return 'gi."EcologicalSiteId" IN ' + this.getQueryList(queryParameterValues);
                break;
            case 'ecologicalSiteIdMlraCode':
                // NO LEADING-CHARACTER REGEX QUANTIFIER NEEDED
                break;
            case 'ecologicalSiteIdSubMlraCode':
                tenCharRegexCount = '3';
                elevenCharRegexCount = '4';
                break;
            case 'ecologicalSiteIdEcositeCode':
                tenCharRegexCount = '5';
                elevenCharRegexCount = '6';
                break;
            case 'ecologicalSiteIdStateCode':
                tenCharRegexCount = '8';
                elevenCharRegexCount = '9';
                break;
        }
        return this.getEcologicalSiteIDWhereRegexCondition(queryParameterValues, tenCharRegexCount, elevenCharRegexCount);
    }
    // 2022-02-16-CMF: Returns where condition specific to field-method selector
    getFieldMethodWhereCondition(queryParameterValues) {
        let fieldMethodWhereCondition = '';
        let or = 'OR\n';
        let isNotNullOr = ' IS NOT NULL\n' + or;
        for (let queryParameterValue of queryParameterValues) {
            switch (queryParameterValue) {
                case 'Line-Point Intercept':
                    fieldMethodWhereCondition +=
                        'gi."BareSoilCover"' + isNotNullOr + 'gi."TotalFoliarCover"' + isNotNullOr +
                            'gi."FH_TotalLitterCover"' + isNotNullOr + 'gi."FH_RockCover"' + isNotNullOr +
                            'gi."FH_LichenCover"' + isNotNullOr + 'gi."FH_CyanobacteriaCover"' + isNotNullOr +
                            'gi."FH_MossCover"' + isNotNullOr;
                    break;
                case 'Vegetation Height':
                    fieldMethodWhereCondition += 'gi."Hgt_Woody_Avg"' + isNotNullOr + 'gi."Hgt_Herbaceous_Avg"' + isNotNullOr;
                    break;
                case 'Canopy gap Intercept':
                    fieldMethodWhereCondition +=
                        'gi."GapCover_25_50"' + isNotNullOr + 'gi."GapCover_51_100"' + isNotNullOr +
                            'gi."GapCover_101_200"' + isNotNullOr + 'gi."GapCover_200_plus"' + isNotNullOr;
                    break;
                case 'Soil Stability':
                    fieldMethodWhereCondition +=
                        'gi."SoilStability_All"' + isNotNullOr + 'gi."SoilStability_Protected"' + isNotNullOr +
                            'gi."SoilStability_Unprotected"' + isNotNullOr;
                    break;
            }
        }
        fieldMethodWhereCondition =
            fieldMethodWhereCondition.slice(0, fieldMethodWhereCondition.length - or.length);
        return fieldMethodWhereCondition;
    }
    // 2022-02-16-CMF: Returns where conditions specific to selectors
    getSelectorWhereConditions(queryParameters) {
        let selectorWhereConditions = '';
        let ecoregionsWhereCondition = '';
        let ecologicalSiteWhereCondition = '';
        let and = '\nAND\n';
        for (let queryParameterName in queryParameters) {
            if (this.isSelectorQueryParameter(queryParameterName)) {
                let queryParameterValues = queryParameters[queryParameterName];
                let whereCondition = '';
                let columnReference = `gi."${columns.filterQueryParametersToColumns[queryParameterName]}"`;
                if (queryParameterName === 'date') {
                    whereCondition += '(' + columnReference + ' BETWEEN ' + '\'' + queryParameterValues[0] + '\'' + '\nAND\n' + '\'' + queryParameterValues[1] + '\'' + ')';
                }
                else if (queryParameterName === 'fieldMethod') {
                    whereCondition += '(\n' + this.getFieldMethodWhereCondition(queryParameterValues) + ')';
                }
                else if (columns.ecoregionSelectors.includes(queryParameterName)) {
                    if (ecoregionsWhereCondition) {
                        ecoregionsWhereCondition += '\nOR\n';
                    }
                    ecoregionsWhereCondition += '(' + columnReference + ' IN ' + this.getQueryList(queryParameterValues) + ')';
                }
                else if (columns.ecologicalSiteSelectors.includes(queryParameterName)) {
                    if (ecologicalSiteWhereCondition) {
                        ecologicalSiteWhereCondition += '\nOR\n';
                    }
                    ecologicalSiteWhereCondition +=
                        this.getEcologicalSiteWhereConditionExtension(queryParameterName, queryParameterValues);
                }
                else {
                    whereCondition += '(' + columnReference + ' IN ' + this.getQueryList(queryParameterValues) + ')';
                }
                if (whereCondition) {
                    selectorWhereConditions += whereCondition + and;
                }
            }
        }
        if (ecoregionsWhereCondition) {
            selectorWhereConditions += '(\n' + ecoregionsWhereCondition + '\n)';
        }
        if (ecologicalSiteWhereCondition) {
            if (selectorWhereConditions && ecoregionsWhereCondition) {
                selectorWhereConditions += and;
            }
            selectorWhereConditions += '(\n' + ecologicalSiteWhereCondition + '\n)';
        }
        const stringEnd = selectorWhereConditions.slice(selectorWhereConditions.length - '\nAND\n'.length, selectorWhereConditions.length);
        if (stringEnd === and) {
            selectorWhereConditions = selectorWhereConditions.slice(0, selectorWhereConditions.length - and.length);
        }
        return selectorWhereConditions;
    }
    // 2022-02-16-CMF: Returns where conditions specific to indicators
    getIndicatorWhereConditions(queryParameters) {
        let indicatorWhereConditions = '';
        let and = '\nAND\n';
        for (let queryParameterName in queryParameters) {
            if (this.isIndicatorQueryParameter(queryParameterName)) {
                indicatorWhereConditions += this.getQueryMinMaxCondition(queryParameterName, queryParameters[queryParameterName])
                    + and;
            }
        }
        return indicatorWhereConditions.slice(0, indicatorWhereConditions.length - and.length);
    }
    // 2022-02-16-CMF: Returns all where conditions as single string
    getWhereConditions(queryParameters) {
        const selectorWhereConditions = this.getSelectorWhereConditions(queryParameters);
        const indicatorWhereConditions = this.getIndicatorWhereConditions(queryParameters);
        let whereConditions = '';
        let where = 'WHERE\n';
        if (selectorWhereConditions && indicatorWhereConditions) {
            whereConditions = where + selectorWhereConditions + '\nAND\n' + indicatorWhereConditions;
        }
        else if (selectorWhereConditions) {
            whereConditions = where + selectorWhereConditions;
        }
        else if (indicatorWhereConditions) {
            whereConditions = where + indicatorWhereConditions;
        }
        return whereConditions;
    }
    // 2022-02-16-CMF: Used for filter (i.e., selector/indicator) requests with restrictions
    selectAdjustedFilterColumns(queryParameters) {
        const offset = queryParameters['offset'][0];
        delete queryParameters['offset'];
        const limit = queryParameters['limit'][0];
        delete queryParameters['limit'];
        const query = `SELECT ${this.getFilterColumnString()}, ${this.getRoundedLatLonSubClause()}\n` +
            `FROM public_dev."geoIndicators_view" gi\n` +
            `${this.getWhereConditions(queryParameters)}\n` +
            `ORDER BY gi."PrimaryKey"\n` +
            `OFFSET ${offset} LIMIT ${limit};`;
        // console.log(query)        
        return query;
    }
    // 2022-02-16-CMF: Used to retrieve PrimaryKey values stored on client for row-restricted processing
    // 2022-02-15-CMF: limit added for Postman testing
    selectPrimaryKeysForAdjustedFilterColumns(queryParameters) {
        let limit = Object.keys(queryParameters).includes('limit') ?
            'LIMIT ' + queryParameters['limit'][0] : '';
        const query = `SELECT gi."PrimaryKey"\n ` +
            `FROM public_dev."geoIndicators_view" gi\n` +
            `${this.getWhereConditions(queryParameters)}\n` +
            `ORDER BY gi."PrimaryKey"\n` +
            `${limit};`;
        // console.log(query)
        return query;
    }
    // 2022-02-16-CMF: Used to retrieve all data for filter (i.e., selector/indicator) requests
    selectAllTableColumns(queryParameters, dbTableName) {
        const query = `SELECT *
                    FROM public_dev."${dbTableName}" AS ${dbTableName}
                    WHERE ${dbTableName}."PrimaryKey" IN ${this.getQueryList(queryParameters.primaryKeys)}
                    ORDER BY ${dbTableName}."PrimaryKey"
                    OFFSET ${queryParameters['offset'][0]} LIMIT ${queryParameters['limit'][0]} ;`;
        return query;
    }
}
exports.QueryGenerator = QueryGenerator;
