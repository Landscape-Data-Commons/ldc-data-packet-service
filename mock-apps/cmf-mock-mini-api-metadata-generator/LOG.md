# mini-api
Node.js package for handling web-portal requests for LDC data

## Contents
- [To do](#To-do)
- [Changes](#Changes)
- [Appendix](#Appendix)

## To do
&#8211;

## Changes
- 2022-08-30 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Updated version from `1.0.0-beta-1.1.0` to `1.0.0-beta-1.2.0` to reflect use of `public_dev.geoIndicators_view` and AERO query-parameter processing
- 2022-08-29 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Add query-parameter and corresponding column information for AERO data
    - Files modified:
      - `./database/columns.ts`
      - `./database/queries.ts`
- 2022-08-24 ([Christopher Fraser](https://github.com/cmfraser1380)): 
  - Update query code to use new `public_dev.geoIndicators_view`
  - Run Postman tests for new `public_dev.geoIndicators_view`
- 2022-08-10 ([Christopher Fraser](https://github.com/cmfraser1380))
  - **BUG FIX:** Change query-parameter parsing delimiter in `getRoutes.ts` to ensure correct parsing of query-parameter values that contain commas (which [break the internet](https://www.rfc-editor.org/rfc/rfc3986#section-2.2))
- 2022-06-21 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Backup in preparation for major software update (NodeJS, Angular, etc.); see [work log](https://github.com/cmfraser1380/ldc-docs/)
- 2022-06-08 ([Christopher Fraser](https://github.com/cmfraser1380)
  - Develop AERO data processing code (endpoints and associated queries); develop Postman tests for code
- 2022-05-30 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Added test results for Postman test collection from 2022-05-27 with delayed response times
- 2022-05-27 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Re-ran Postman tests; yielded long delays (greater than 2 min. for `public_dev.dataLPI`)
- 2022-05-26 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Updated Postman tests for `public_dev` (added query-parameter entry for `ProjectKey`; converted expected responses for failing Postman tests to current responses from `public_dev`); note differences in the following columns between `public_dev` and `public`:

    ```
    na_l2name
    na_l2name
    us_l3name

    SELECT DISTINCT(t."na_l1name") 
    FROM public."geoIndicators" t 
    WHERE t."na_l1name" NOT IN (
      SELECT t."na_l1name" 
      FROM public_dev."geoIndicators" t 
      WHERE t."na_l1name" IS NOT NULL
    );


            na_l1name         
    --------------------------
    MARINE WEST COAST FOREST
    TUNDRA
    (2 rows)

    SELECT DISTINCT(t."na_l2name") 
    FROM public."geoIndicators" t 
    WHERE t."na_l2name" NOT IN (
      SELECT t."na_l2name" 
      FROM public_dev."geoIndicators" t 
      WHERE t."na_l2name" IS NOT NULL
    );

            na_l2name         
    --------------------------
    BOREAL CORDILLERA
    MARINE WEST COAST FOREST
    BROOKS RANGE TUNDRA
    ALASKA TUNDRA
    (4 rows)


    SELECT DISTINCT(t."us_l3name") 
    FROM public."geoIndicators" t 
    WHERE t."us_l3name" NOT IN (
      SELECT t."us_l3name" 
      FROM public_dev."geoIndicators" t 
      WHERE t."us_l3name" IS NOT NULL
    );

          us_l3name       
    ----------------------
    Interior Highlands
    Arctic Coastal Plain
    Brooks Range
    Cook Inlet
    Arctic Foothills
    (5 rows)


    SELECT DISTINCT(t."us_l4name") 
    FROM public."geoIndicators" t 
    WHERE t."us_l4name" NOT IN (
      SELECT t."us_l4name" 
      FROM public_dev."geoIndicators" t 
      WHERE t."us_l4name" IS NOT NULL
    );

    us_l4name 
    -----------
    (0 rows)    
    ```
    Response times for tables other than `public_dev.geoIndicators` tables still high
      - Files
        - Created 
          `tests/postman/gisdb/public-dev/mini-api-public-dev.postman_collection.json`
        - Modified
          - `database/columns.ts`
- 2022-05-22 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Postponed `PrimaryKey` query comparisons and deleted corresponding Markdown file (will implement via `data-wrangler`); created additional Postman test collection from old mini-API collection &#8212; to modify and compare with `public_dev` tests; ***Found that `public_dev.geoIndicators` has only `NULL` values for `ProjectKey`, as follows:

    ```
    gisdb=> select count(*) from public_dev."geoIndicators";
    -[ RECORD 1 ]
    count | 37367

    gisdb=> select count(*) from public_dev."geoIndicators" t where t."ProjectKey" IS NULL;
    -[ RECORD 1 ]
    count | 37367
    ```
    Exported files from yesterday to new `test-results` folder in `public_dev` directory
    - Files
      - Created 
        - `tests/postman/gisdb-public_dev/test-results/2022-05-21/mini-api-public-dev.postman_test_run.json`
      - Deleted
        - `tests/postman/gisdb/schema-comparisons/primary-key-comparisons.txt`
- 2022-05-21 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Revised Postman tests to accommodate new data in `public_dev` database schema; created subdirectories in `tests/postman` directory for `public` and `public_dev` schemas; relocated existing test collection to subdirectories (note: Postman workspace globals left in top-level directory, `tests/postman`); appended `-OLD` suffix to old test collection (in Postman and mini-API directories); created `shell-processing` subdirectory with `one-liners.sh` file for BASH one-liners to facilitate Postman test comparisons (for `public` and `public_dev` schemas); created subdirectories and files for schema comparisons; ran Postman test collection `mini-api-public-dev` created from copied `mini-api` test collection on `public_dev` &#8212; 63 of 256 tests failed; some test failures due to content (e.g., lack of `ProjectName` in `public_dev.geoIndicators`), others due to time delays, as follows:
    
    ```
    Delays:

    Table			            Expected (ms)		Observed (ms)

    dataLPI			          < 500			      19946
    dataHeight		        < 500			      11701
    dataGap			          < 500		     	   4376
    dataSpeciesInventory	< 500			       1505
    geoSpecies		        < 500			       1083
    dataSoilStability	    < 500			        757
    ```
    Delays possibly due to lack of indexes on `public_dev` tables;
    - Files
      - Created
        - `tests/postman/shell-processing/one-liners.sh`
        - `tests/postman/gisdb/schema-comparisons/README.md`
        - `tests/postman/gisdb/schema-comparisons/primary-key-comparisons.txt`
      - Moved
        - `tests/postman/mini-api.postman_collection.json` to
          - `tests/postman/gisdb/public/mini-api.postman_collection.json` 
      - Renamed
        - `tests/postman/gisdb-public/mini-api.postman_collection.json` to
          - `tests/postman/gisdb/public/mini-api.postman_collection-OLD.json` 
- 2022-05-09 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Initiated development of code for processing AERO requests
    - Files
      - Modified
        - `database/queries.ts`
        - `database/columns.ts`
        - `routes/getRoutes.ts`
- 2022-05-01 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Converted `ROUND()` clauses in `getRoundedLatLonSubClause()` to include `CAST()` to accommodate change from `NUMERIC` type for lat/lon values in old schema to `DOUBLE PRECISION` in new schema; tested `CAST` addition with Postman; checked and commented entries in `filterQueryParametersToColumns` that do not have corresponding `public_dev` entries in `public_dev.geoIndicators`
    - Files
      - Modified
        - `database/queries.ts`
        - `database/columns.ts`
- 2022-04-29 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Continued transition to new database schema (`public_dev`); see `database-checker` package for continued implementation and tests; refactored `queries.ts` to enable stand-alone testing of transpiled code (in `queries.js`); reduced string interpolation in SQL queries in `QueryGenerator` methods to avoid transpilation `this` issues (side benefit: improved readability of queries); note that all table references in `queries.js` now have `public` schema qualifier &#8212; to facilitate schema swap-outs; tested changes with Postman mini-API collection (passed all tests); removed (unnecessary) body test from Postman test `latitude-longitude-01`;
    - Files
      - Modified
        - `database/queries.ts` (and by transpilation, `queries.js`)
    - Postman tests
      - Modified
        - `mini-api/web-portal/endpoints/geoindicators/latitude-longitude/latitude-longitude-01`
- 2022-04-26 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Continued transition to new database schema (`public_dev`); see `database-checker` package for initial implementations and tests
- 2022-04-22 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Began transition to new database schema (`public_dev`); see `database-checker` package for initial implementations and tests
- 2022-03-25 ([Christopher Fraser](https://github.com/cmfraser1380))
  - Created this `README.md`

## Appendix

### Running on `localhost`
- Start tsc in watch mode: `npm run tsc`
- Start `nodemon`: `npm start`