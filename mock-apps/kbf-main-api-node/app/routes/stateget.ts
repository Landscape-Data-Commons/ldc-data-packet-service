import express from 'express'
import * as geoIndicatorsController from '../controllers/geoindicatorGet'
import * as geoSpeciesController from '../controllers/geoSpeciesGet'
import * as dataSpeciesInv from '../controllers/speciesInventoryGet'
import * as dataHeight from '../controllers/heightGet'
import * as dataLPI from '../controllers/lpiGet'
import * as dataSoil from '../controllers/soilStabilityGet'
import * as dataGap from '../controllers/gapGet'
import * as dataHeader from '../controllers/headerGet'
import * as aeroController from '../controllers/aeroGet'
import { checkJwt } from '../index'
import jwtok from 'jsonwebtoken'
// import postTest from '../controllers/posttest'

const router = express.Router()




// GET /api/plots
// router.get('/project/:source', stateController.getState)

/**
 * @swagger 
 * /api/geoindicators:
 *  get:
 *    tags:
 *      - GeoIndicators
 *    name: GeoIndicators
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        type: "array"
 *        items:
 *          type: "string"
 *          enum:
 *          - "AIM"
 *          - "LMF"
 *      - in : query
 *        name: EcologicalSiteId
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/geoindicators"
 */

 router.get('/geoindicators', geoIndicatorsController.getGeoInd)

/**
 * @swagger 
 * /api/geospecies:
 *  get:
 *    tags:
 *      - GeoSpecies
 *    name: GeoSpecies
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: Species
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/geospecies"
 */

 router.get('/geospecies',geoSpeciesController.getSpecies)
 
/**
 * @swagger 
 * /api/dataspeciesinventory:
 *  get:
 *    tags:
 *      - dataSpeciesInventory
 *    name: dataSpeciesInventory
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/dataspeciesinventory"
 */

router.get('/dataspeciesinventory',dataSpeciesInv.getSpeciesInv)


/**
 * @swagger 
 * /api/dataheight:
 *  get:
 *    tags:
 *      - dataHeight
 *    name: dataHeight
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/dataheight"
 */

 router.get('/dataheight',dataHeight.getHeight)

 /**
 * @swagger 
 * /api/datalpi:
 *  get:
 *    tags:
 *      - dataLPI
 *    name: dataLPI
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/datalpi"
 */

router.get('/datalpi',dataLPI.getLPI)

/**
 * @swagger 
 * /api/datasoilstability:
 *  get:
 *    tags:
 *      - dataSoilStability
 *    name: dataSoilStability
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/datasoilstability"
 */

 router.get('/datasoilstability',dataSoil.getSoilStab)

 /**
 * @swagger 
 * /api/datagap:
 *  get:
 *    tags:
 *      - dataGap
 *    name: dataGap
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: Species
 *        schema:
 *          type: string
 * 
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/datagap"
 */


router.get('/datagap',dataGap.getGap)

/**
 * @swagger 
 * /api/dataheader:
 *  get:
 *    tags:
 *      - dataHeader
 *    name: dataHeader
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: PrimaryKey
 *        schema:
 *          type: string
 *      - in : query
 *        name: SpeciesKey
 *        type: "array"
 *        items:
 *          type: "string"
 *          enum:
 *          - "AK"
 *          - "AZ"
 *          - "CA"
 *          - "CO"
 *          - "ID"
 *          - "MT"
 *          - "NM"
 *          - "NV"
 *          - "OR"
 *          - "UT"
 *          - "WY"
 *      - in : query
 *        name: EcologicalSiteId
 *        schema:
 *          type: string
 *      - in : query
 *        name: ProjectKey
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/dataheader"
 *definitions:
 *  geoindicators:
 *    type: "object"
 *    properties:
 *      AH_AnnGrassCover:
 *        type: "number"
 *      AH_ForbCover:
 *        type: "number"
 *      AH_GrassCover:
 *        type: "number"
 *      AH_NonNoxAnnForbCover:
 *        type: "number"
 *      AH_NonNoxAnnForbGrassCover:
 *        type: "number"
 *      AH_NonNoxAnnGrassCover:
 *        type: "number"
 *      AH_NonNoxCover:
 *        type: "number"
 *      AH_NonNoxPerenForbCover:
 *        type: "number"
 *      AH_NonNoxPerenForbGrassCover:
 *        type: "number"
 *      AH_NonNoxPerenGrassCover:
 *        type: "number"
 *      AH_NonNoxShrubCover:
 *        type: "number"
 *      AH_NonNoxSubShrubCover:
 *        type: "number"
 *      AH_NonNoxSucculentCover:
 *        type: "number"
 *      AH_NonNoxTreeCover:
 *        type: "number"
 *      AH_NonSagebrushShrubCover:
 *        type: "number"
 *      AH_NoxAnnForbCover:
 *        type: "number"
 *      AH_NoxAnnGrassCover:
 *        type: "number"
 *      AH_NoxCover:
 *        type: "number"
 *      AH_NoxPerenForbCover:
 *        type: "number"
 *      AH_NoxPerenForbGrassCover:
 *        type: "number"
 *      AH_PreferredForb:
 *        type: "number"
 *      AH_PreferredForbCover:
 *        type: "number"
 *      AH_SagebrushCover:
 *        type: "number"
 *      AH_SagebrushCover_Live:
 *        type: "number"
 *      AH_ShortPerenGrassCover:
 *        type: "number"
 *      AH_ShrubCover:
 *        type: "number"
 *      AH_TallPerenGrassCover:
 *        type: "number"
 *      BareSoilCover:
 *        type: "number"
 *      County:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      DateEstablished:
 *        type: "string"
 *        format: date
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      DateVisited:
 *        type: "string"
 *        format: date
 *      ELEVATION:
 *        type: "number"
 *      EcolSiteName:
 *        type: "string"
 *      EcologicalSiteId:
 *        type: "string"
 *      FH_CyanobacteriaCover:
 *        type: "number"
 *      FH_DepSoilCover:
 *        type: "number"
 *      FH_DuffCover:
 *        type: "number"
 *      FH_EmbLitterCover:
 *        type: "number"
 *      FH_HerbLitterCover:
 *        type: "number"
 *      FH_LichenCover:
 *        type: "number"
 *      FH_MossCover:
 *        type: "number"
 *      FH_NonNoxAnnForbCover:
 *        type: "number"
 *      FH_NonNoxAnnGrassCover:
 *        type: "number"
 *      FH_NonNoxPerenForbCover:
 *        type: "number"
 *      FH_NonNoxShrubCover:
 *        type: "number"
 *      FH_NonNoxSubShrubCover:
 *        type: "number"
 *      FH_NonNoxSucculentCover:
 *        type: "number"
 *      FH_NonNoxTreeCover:
 *        type: "number"
 *      FH_NoxAnnForbCover:
 *        type: "number"
 *      FH_NoxAnnGrassCover:
 *        type: "number"
 *      FH_NoxPerenForbCover:
 *        type: "number"
 *      FH_NoxPerenGrassCover:
 *        type: "number"
 *      FH_NoxShrubCover:
 *        type: "number"
 *      FH_NoxSubShrubCover:
 *        type: "number"
 *      FH_NoxSucculentCover:
 *        type: "number"
 *      FH_NoxTreeCover:
 *        type: "number"
 *      FH_RockCover:
 *        type: "number"
 *      FH_SagebrushCover:
 *        type: "number"
 *      FH_TotalLitterCover:
 *        type: "number"
 *      FH_VagrLichenCover:
 *        type: "number"
 *      FH_WaterCover:
 *        type: "number"
 *      FH_WoodyLitterCover:
 *        type: "number"
 *      GapCover_101_200:
 *        type: "number"
 *      GapCover_200_plus:
 *        type: "number"
 *      GapCover_25_50:
 *        type: "number"
 *      GapCover_25_plus:
 *        type: "number"
 *      GapCover_51_100:
 *        type: "number"
 *      GlobalID:
 *        type: "string"
 *      Hgt_Forb_Avg:
 *        type: "number"
 *      Hgt_Grass_Avg:
 *        type: "number"
 *      Hgt_Herbaceous_Avg:
 *        type: "number"
 *      Hgt_NonNoxPerenGrass_Avg:
 *        type: "number"
 *      Hgt_NonSagebrushShrub_Avg:
 *        type: "number"
 *      Hgt_NoxPerenGrass_Avg:
 *        type: "number"
 *      Hgt_PerenForbGrass_Avg:
 *        type: "number"
 *      Hgt_PerenForb_Avg:
 *        type: "number"
 *      Hgt_PerenGrass_Avg:
 *        type: "number"
 *      Hgt_Sagebrush_Avg:
 *        type: "number"
 *      Hgt_Sagebrush_Live_Avg:
 *        type: "number"
 *      Hgt_ShortPerenGrass_Avg:
 *        type: "number"
 *      Hgt_TallPerenGrass_Avg:
 *        type: "number"
 *      Hgt_Woody_Avg:
 *        type: "number"
 *      Latitude_NAD83:
 *        type: "number"
 *      LocationType:
 *        type: "string"
 *      Longitude_NAD83:
 *        type: "number"
 *      NumSpp_NonNoxPlant:
 *        type: "integer"
 *      NumSpp_NoxPlant:
 *        type: "integer"
 *      NumSpp_PreferredForb:
 *        type: "integer"
 *      PercentCoveredByEcoSite:
 *        type: "number"
 *      PlotID:
 *        type: "string"
 *      PlotKey:
 *        type: "string"
 *      PrimaryKey:
 *        type: "string"
 *      ProjectName:
 *        type: "string"
 *      RH_AnnualProd:
 *        type: "string"
 *      RH_BareGround:
 *        type: "string"
 *      RH_BioticIntegrity:
 *        type: "string"
 *      RH_CommentsBI:
 *        type: "string"
 *      RH_CommentsHF:
 *        type: "string"
 *      RH_CommentsSS:
 *        type: "string"
 *      RH_Compaction:
 *        type: "string"
 *      RH_DeadDyingPlantParts:
 *        type: "string"
 *      RH_FuncSructGroup:
 *        type: "string"
 *      RH_Gullies:
 *        type: "string"
 *      RH_HydrologicFunction:
 *        type: "string"
 *      RH_InvasivePlants:
 *        type: "string"
 *      RH_LitterAmount:
 *        type: "string"
 *      RH_LitterMovement:
 *        type: "string"
 *      RH_PedestalsTerracettes:
 *        type: "string"
 *      RH_PlantCommunityComp:
 *        type: "string"
 *      RH_ReprodCapabilityPeren:
 *        type: "string"
 *      RH_Rills:
 *        type: "string"
 *      RH_SoilSiteStability:
 *        type: "string"
 *      RH_SoilSurfLossDeg:
 *        type: "string"
 *      RH_SoilSurfResisErosion:
 *        type: "string"
 *      RH_WaterFlowPatterns:
 *        type: "string"
 *      RH_WindScouredAreas:
 *        type: "string"
 *      SagebrushShape_All_ColumnCount:
 *        type: "number"
 *      SagebrushShape_All_Predominant:
 *        type: "string"
 *      SagebrushShape_All_SpreadCount:
 *        type: "number"
 *      SagebrushShape_Live_ColumnCount:
 *        type: "number"
 *      SagebrushShape_Live_Predominant:
 *        type: "string"
 *      SagebrushShape_Live_SpreadCount:
 *        type: "number"
 *      SoilStability_All:
 *        type: "number"
 *      SoilStability_Protected:
 *        type: "number"
 *      SoilStability_Unprotected:
 *        type: "number"
 *      Spp_Nox:
 *        type: "string"
 *      Spp_PreferredForb:
 *        type: "string"
 *      Spp_Sagebrush:
 *        type: "string"
 *      Spp_ShortPerenGrass:
 *        type: "string"
 *      Spp_TallPerenGrass:
 *        type: "string"
 *      State:
 *        type: "string"
 *      TotalFoliarCover:
 *        type: "number"
 *      created_date:
 *        type: "string"
 *        format: date
 *      created_user:
 *        type: "string"
 *        format: date
 *      last_edited_date:
 *        type: "string"
 *        format: date
 *      last_edited_user:
 *        type: "string"
 *        format: date
 *  geospecies:
 *    type: "object"
 *    properties:
 *      AH_SpeciesCover:
 *        type: "number"
 *      AH_SpeciesCover_n:
 *        type: "integer"
 *      DBKey:
 *        type: "string"
 *      Duration:
 *        type: "string"
 *      GlobalID:
 *        type: "string"
 *      GrowthHabit:
 *        type: "string"
 *      GrowthHabitSub:
 *        type: "string"
 *      Hgt_Species_Avg:
 *        type: "number"
 *      Hgt_Species_Avg_n:
 *        type: "number"
 *      Noxious:
 *        type: "string"
 *      PlotID:
 *        type: "string"
 *      PrimaryKey:
 *        type: "string"
 *      SG_Group:
 *        type: "string"
 *      Species:
 *        type: "string"
 *      created_date:
 *        type: "string"
 *        format: date
 *      created_user:
 *        type: "string"
 *        format: date
 *      last_edited_date:
 *        type: "string"
 *        format: date
 *      last_edited_user:
 *        type: "string"
 *        format: date
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      SpeciesKey:
 *        type: "string"
 *  dataspeciesinventory:
 *    type: "object"
 *    properties:
 *      LineKey:
 *        type: "string"
 *      RecKey:
 *        type: "string"
 *      DateModified:
 *        type: "string"
 *        format: date
 *      FormType:
 *        type: "string"
 *      FormDate:
 *        type: "string"
 *        format: date
 *      SpecRichMethod:
 *        type: "number"
 *      SpecRichMeasure:
 *        type: "number"
 *      SpecRichNbrSubPlots:
 *        type: "number"
 *      SpecRich1Container:
 *        type: "number"
 *      SpecRich1Shape:
 *        type: "number"
 *      SpecRich1Dim1:
 *        type: "number"
 *      SpecRich1Dim2:
 *        type: "number"
 *      SpecRich1Area:
 *        type: "number"
 *      SpecRich2Container:
 *        type: "number"
 *      SpecRich2Shape:
 *        type: "number"
 *      SpecRich2Dim1:
 *        type: "number"
 *      SpecRich2Dim2:
 *        type: "number"
 *      SpecRich2Area:
 *        type: "number"
 *      SpecRich3Container:
 *        type: "number"
 *      SpecRich3Shape:
 *        type: "number"
 *      SpecRich3Dim1:
 *        type: "number"
 *      SpecRich3Dim2:
 *        type: "number"
 *      SpecRich3Area:
 *        type: "number"
 *      SpecRich4Container:
 *        type: "number"
 *      SpecRich4Shape:
 *        type: "number"
 *      SpecRich4Dim1:
 *        type: "number"
 *      SpecRich4Dim2:
 *        type: "number"
 *      SpecRich4Area:
 *        type: "number"
 *      SpecRich5Container:
 *        type: "number"
 *      SpecRich5Shape:
 *        type: "number"
 *      SpecRich5Dim1:
 *        type: "number"
 *      SpecRich5Dim2:
 *        type: "number"
 *      SpecRich5Area:
 *        type: "number"
 *      SpecRich6Container:
 *        type: "number"
 *      SpecRich6Shape:
 *        type: "number"
 *      SpecRich6Dim1:
 *        type: "number"
 *      SpecRich6Dim2:
 *        type: "number"
 *      SpecRich6Area:
 *        type: "number"
 *      Notes:
 *        type: "string"
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      PrimaryKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      created_user:
 *        type: "string"
 *        format: date
 *      created_date:
 *        type: "string"
 *        format: date
 *      last_edited_user:
 *        type: "string"
 *        format: date
 *      last_edited_date:
 *        type: "string"
 *        format: date
 *      GlobalID:
 *        type: "string"
 *      Species:
 *        type: "string"
 *      ProjectKey:
 *        type: "string"
 *      SpeciesCount:
 *        type: "number"
 *      DENSITY:
 *        type: "number"
 *      PLOTKEY:
 *        type: "string"
 *  dataheight:
 *    type: "object"
 *    properties:
 *      PrimaryKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      PointLoc:
 *        type: "number"
 *      PointNbr:
 *        type: "number"
 *      RecKey:
 *        type: "string"
 *      Height:
 *        type: "number"
 *      Species:
 *        type: "string"
 *      Chkbox:
 *        type: "number"
 *      type:
 *        type: "string"
 *      GrowthHabit_measured:
 *        type: "string"
 *      LineKey:
 *        type: "string"
 *      DateModified:
 *        type: "string"
 *        format: date
 *      FormType:
 *        type: "string"
 *      FormDate:
 *        type: "string"
 *        format: date
 *      Observer:
 *        type: "string"
 *      Recorder:
 *        type: "string"
 *      DataEntry:
 *        type: "string"
 *      DataErrorChecking:
 *        type: "string"
 *      Direction:
 *        type: "string"
 *      Measure:
 *        type: "number"
 *      LineLengthAmount:
 *        type: "number"
 *      SpacingIntervalAmount:
 *        type: "number"
 *      SpacingType:
 *        type: "string"
 *      HeightOption:
 *        type: "string"
 *      HeightUOM:
 *        type: "string"
 *      ShowCheckbox:
 *        type: "number"
 *      CheckboxLabel:
 *        type: "string"
 *      ProjectKey:
 *        type: "string"
 *      UOM:
 *        type: "string"
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *  datalpi:
 *    type: "object"
 *    properties:
 *      LineKey:
 *        type: "string"
 *      RecKey:
 *        type: "string"
 *      DateModified:
 *        type: "string"
 *        format: date
 *      FormType:
 *        type: "string"
 *      FormDate:
 *        type: "string"
 *        format: date
 *      Observer:
 *        type: "number"
 *      Recorder:
 *        type: "string"
 *      DataEntry:
 *        type: "number"
 *      DataErrorChecking:
 *        type: "string"
 *      GrowthHabit_measured:
 *        type: "string"
 *      Direction:
 *        type: "string"
 *      Measure:
 *        type: "number"
 *      LineLengthAmount:
 *        type: "number"
 *      SpacingIntervalAmount:
 *        type: "number"
 *      SpacingType:
 *        type: "string"
 *      HeightOption:
 *        type: "string"
 *      HeightUOM:
 *        type: "string"
 *      ShowCheckbox:
 *        type: "string"
 *      CheckboxLabel:
 *        type: "string"
 *      PrimaryKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      PointLoc:
 *        type: "number"
 *      PointNbr:
 *        type: "number"
 *      ShrubShape:
 *        type: "string"
 *      layer:
 *        type: "string"
 *      code:
 *        type: "string"
 *      chckbox:
 *        type: "number"
 *      ProjectKey:
 *        type: "string"
 *      STATE:
 *        type: "string"
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      SAGEBRUSH_SPP:
 *        type: "string"
 *      PLOTKEY:
 *        type: "string"
 * 
 * 
 *  datasoilstability:
 *    type: "object"
 *    properties:
 *      PlotKey:
 *        type: "string"
 *      RecKey:
 *        type: "string"
 *      DateModified:
 *        type: "string"
 *        format: date
 *      FormType:
 *        type: "string"
 *      FormDate:
 *        type: "string"
 *        format: date
 *      LineKey:
 *        type: "number"
 *      Observer:
 *        type: "number"
 *      Recorder:
 *        type: "string"
 *      DataEntry:
 *        type: "string"
 *      DataErrorChecking:
 *        type: "string"
 *      SoilStabSubSurface:
 *        type: "number"
 *      Notes:
 *        type: "string"
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      PrimaryKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      Position:
 *        type: "number"
 *      Line:
 *        type: "string"
 *      Pos:
 *        type: "string"
 *      Veg:
 *        type: "string"
 *      Rating:
 *        type: "number"
 *      Hydro:
 *        type: "number"
 *      ProjectKey:
 *        type: "string"
 * 
 *  datagap:
 *    type: "object"
 *    properties:
 *      LineKey:
 *        type: "string"
 *      RecKey:
 *        type: "string"
 *      DateModified:
 *        type: "string"
 *        format: date
 *      FormType:
 *        type: "string"
 *      FormDate:
 *        type: "string"
 *        format: date
 *      Direction:
 *        type: "string"
 *      Measure:
 *        type: "number"
 *      LineLengthAmount:
 *        type: "number"
 *      GapMin:
 *        type: "number"
 *      GapData:
 *        type: "number"
 *      PerennialsCanopy:
 *        type: "number"
 *      AnnualGrassesCanopy:
 *        type: "number"
 *      AnnualForbsCanopy:
 *        type: "number"
 *      OtherCanopy:
 *        type: "number"
 *      Notes:
 *        type: "string"
 *      NoCanopyGaps:
 *        type: "number"
 *      NoBasalGaps:
 *        type: "number"
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      PerennialsBasal:
 *        type: "number"
 *      AnnualGrassesBasal:
 *        type: "number"
 *      AnnualForbsBasal:
 *        type: "number"
 *      OtherBasal:
 *        type: "number"
 *      PrimaryKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      SeqNo:
 *        type: "string"
 *      RecType:
 *        type: "number"
 *      GapStart:
 *        type: "number"
 *      GapEnd:
 *        type: "number"
 *      Gap:
 *        type: "string"
 *      ProjectKey:
 *        type: "string"
 *  dataheader:
 *    type: "object"
 *    properties:
 *      PrimaryKey:
 *        type: "string"
 *      SpeciesKey:
 *        type: "string"
 *      PlotID:
 *        type: "string"
 *      PlotKey:
 *        type: "string"
 *      DBKey:
 *        type: "string"
 *      EcologicalSiteId:
 *        type: "string"
 *      Latitude_NAD83:
 *        type: "number"
 *      Longitude_NAD83:
 *        type: "number"
 *      State:
 *        type: "string"
 *      DateEstablished:
 *        type: "string"
 *        format: date
 *      DateLoadedInDb:
 *        type: "string"
 *        format: date
 *      ProjectName:
 *        type: "string"
 *      ProjectKey:
 *        type: "string"
 *      LocationType:
 *        type: "string"
 *      DateVisited:
 *        type: "string"
 *        format: date
 *      PercentCoveredByEcoSite:
 *        type: "number"
 *      wkb_geometry:
 *        type: "geometry"
 * 
 */
 router.get('/logged/dataheader',dataHeader.getHeader)
/*PROTECTED ROUTES */
// DATA GAP

// only projectkey===LMF if no extra permission
// only DateVisited is before 2/11/2019 if no extra permission

/*
1. check auth 

2. if permissions include lmf -> next 
     if not: publicrestricted(3 pk's only lmf and datevisited <2/11/2019 ) 
   if permissions include testDate -> next 
     if not: public_lmf ( 3 pk's only, datevisited <2/11/2019)
  next: unrestricted

*/
let decoded:jwtok.JwtPayload
router.use('/logged/datagap_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  
  let decoded = jwtok.decode(token)

  if(req.headers.authorization){
    checkJwt
    console.log(decoded)
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})
// if both permissions
router.get('/logged/datagap_coords', (req,res, next)=>{
  if(decoded.hasOwnProperty('permissions') && decoded!==null){
    console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
  }
  
},dataGap.getGapCoords)

// no date permission == datelimited
router.get('/logged/datagap_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataGap.getGapCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/datagap_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataGap.getGapCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/datagap_coords', dataGap.getGapCoords_loggedrestricted)
// DATA HEADER
router.use('/logged/dataheader_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})

// if both permissions
router.get('/logged/dataheader_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},dataHeader.getHeaderCoords)

// no date permission == datelimited
router.get('/logged/dataheader_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataHeader.getHeaderCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/dataheader_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataHeader.getHeaderCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/dataheader_coords', dataHeader.getHeaderCoords_loggedrestricted)





// DATA HEIGHT 
router.use('/logged/dataheight_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})


// if both permissions
router.get('/logged/dataheight_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},dataHeight.getHeightCoords)

// no date permission == datelimited
router.get('/logged/dataheight_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataHeight.getHeightCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/dataheight_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataHeight.getHeightCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/dataheight_coords', dataHeight.getHeightCoords_loggedrestricted)





// DATA LPI
router.use('/logged/datalpi_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})

// if both permissions
router.get('/logged/datalpi_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},dataLPI.getLPICoords)

// no date permission == datelimited
router.get('/logged/datalpi_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataLPI.getLPICoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/datalpi_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataLPI.getLPICoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/datalpi_coords', dataLPI.getLPICoords_loggedrestricted)





// DATA SOIL STAB 
router.use('/logged/datasoilstability_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})

router.get('/logged/datasoilstability_coords', (req,res, next)=>{
  // tier 1
  console.log(decoded.permissions)
  if(decoded.permissions.length>0 && decoded.permissions.includes("read:test")) next('route') 
  else next()
},dataSoil.getSoilStabilityCoords_public)

router.get('/logged/datasoilstability_coords',dataSoil.getSoilStabilityCoords)


// if both permissions
router.get('/logged/datasoilstability_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},dataSoil.getSoilStabilityCoords)

// no date permission == datelimited
router.get('/logged/datasoilstability_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataSoil.getSoilStabilityCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/datasoilstability_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataSoil.getSoilStabilityCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/datasoilstability_coords', dataSoil.getSoilStabilityCoords_loggedrestricted)




//DATA SPECIES INV 
router.use('/logged/dataspeciesinventory_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})


// if both permissions
router.get('/logged/dataspeciesinventory_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},dataSpeciesInv.getSpeciesInventoryCoords)

// no date permission == datelimited
router.get('/logged/dataspeciesinventory_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataSpeciesInv.getSpeciesInventoryCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/dataspeciesinventory_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},dataSpeciesInv.getSpeciesInventoryCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/dataspeciesinventory_coords', dataSpeciesInv.getSpeciesInventoryCoords_loggedrestricted)







// GEO SPECIES 
router.use('/logged/geospecies_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})

// if both permissions
router.get('/logged/geospecies_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},geoSpeciesController.getGeoSpeciesCoords)

// no date permission == datelimited
router.get('/logged/geospecies_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},geoSpeciesController.getGeoSpeciesCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/geospecies_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},geoSpeciesController.getGeoSpeciesCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/geospecies_coords', geoSpeciesController.getGeoSpeciesCoords_loggedrestricted)






// GEO INDICATORS 
router.use('/logged/geoindicators_coords', (req,res,next)=>{
  let token!:string
  if(req.headers.authorization!==undefined){
    token =req.headers.authorization.split(' ')[1]
  }
  let decoded = jwtok.decode(token)
  if(req.headers.authorization){
    checkJwt
    next()
  } else {
    console.log('forbidden')
    res.status(403).send('forbidden!!!')
  }
})

// if both permissions
router.get('/logged/geoindicators_coords', (req,res, next)=>{
  console.log("if it has both:",decoded.permissions.includes("read:lmf"),!decoded.permissions.includes("read:date"))
  if(decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date"))  next()
  else next('route')
},geoIndicatorsController.getGeoIndicatorsCoords)

// no date permission == datelimited
router.get('/logged/geoindicators_coords',(req,res, next)=>{
  if(decoded.permissions.includes("read:lmf") && !decoded.permissions.includes("read:date")) next() 
  else next('route')
},geoIndicatorsController.getGeoIndicatorsCoords_loggedrestricted_datelimited)

// no lmf permission == lmflimited
router.get('/logged/geoindicators_coords', (req,res, next)=>{
  if(!decoded.permissions.includes("read:lmf") && decoded.permissions.includes("read:date")) next() 
  else next('route')
},geoIndicatorsController.getGeoIndicatorsCoords_loggedrestricted_lmflimited)

// no permissions BUT logged in
router.get('/logged/geoindicators_coords', geoIndicatorsController.getGeoIndicatorsCoords_loggedrestricted)






/* PUBLIC ROUTES */

router.get('/dataheader_coords',dataHeader.getHeaderCoords_public)
router.get('/dataheader',dataHeader.getHeader)
router.get('/dataheight_coords',dataHeight.getHeightCoords_public)
router.get('/dataheight',dataHeight.getHeight)
router.get('/datagap_coords',dataGap.getGapCoords_public)
router.get('/datagap',dataGap.getGap)
router.get('/datalpi_coords',dataLPI.getLPICoords_public)
router.get('/datalpi',dataLPI.getLPI)
router.get('/datasoilstability_coords',dataSoil.getSoilStabilityCoords_public)
router.get('/datasoilstability',dataSoil.getSoilStab)
router.get('/dataspeciesinventory_coords',dataSpeciesInv.getSpeciesInventoryCoords_public)
router.get('/dataspeciesinventory',dataSpeciesInv.getSpeciesInv)
router.get('/geospecies_coords',geoSpeciesController.getGeoSpeciesCoords_public)
router.get('/geospecies',geoSpeciesController.getSpecies)
router.get('/geoindicators_coords',geoIndicatorsController.getGeoIndicatorsCoords_public)
router.get('/geoindicators',geoIndicatorsController.getGeoInd)

// router.post('/postheader',dataHeader.postHeader)

// router.use('/posttest', (req,res,next)=>{
//   //get token from request headers?
//   let token =req.headers.authorization.split(' ')[1]
//   decoded = jwtok.decode(token)
//   if(req.headers.authorization){
    
//     checkJwt
//     console.log("HMM", decoded)
//     next()
//   } else {
//     console.log('forbidden')
//     res.status(403).send('forbidden!!!')
//   }
// })

router.get('/aero', aeroController.getAeroData)



export default router


 