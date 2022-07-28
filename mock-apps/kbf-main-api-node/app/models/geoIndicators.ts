import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface geoIndicatorsAttributes {
  AH_AnnGrassCover?: number;
  AH_ForbCover?: number;
  AH_GrassCover?: number;
  AH_NonNoxAnnForbCover?: number;
  AH_NonNoxAnnForbGrassCover?: number;
  AH_NonNoxAnnGrassCover?: number;
  AH_NonNoxCover?: number;
  AH_NonNoxPerenForbCover?: number;
  AH_NonNoxPerenForbGrassCover?: number;
  AH_NonNoxPerenGrassCover?: number;
  AH_NonNoxShrubCover?: number;
  AH_NonNoxSubShrubCover?: number;
  AH_NonNoxSucculentCover?: number;
  AH_NonNoxTreeCover?: number;
  AH_NonSagebrushShrubCover?: number;
  AH_NoxAnnForbCover?: number;
  AH_NoxAnnForbGrassCover?: number;
  AH_NoxAnnGrassCover?: number;
  AH_NoxCover?: number;
  AH_NoxPerenForbCover?: number;
  AH_NoxPerenForbGrassCover?: number;
  AH_NoxPerenGrassCover?: number;
  AH_NoxShrubCover?: number;
  AH_NoxSubShrubCover?: number;
  AH_NoxSucculentCover?: number;
  AH_NoxTreeCover?: number;
  AH_PerenForbCover?: number;
  AH_PerenGrassCover?: number;
  AH_PerenGrassForbCover?: number;
  AH_PreferredForbCover?: number;
  AH_SagebrushCover?: number;
  AH_SagebrushCover_Live?: number;
  AH_ShortPerenGrassCover?: number;
  AH_ShrubCover?: number;
  AH_TallPerenGrassCover?: number;
  BareSoilCover?: number;
  County?: string;
  DBKey?: string;
  DateEstablished?: string;
  DateLoadedInDb?: string;
  DateVisited?: string;
  EcologicalSiteId?: string;
  FH_CyanobacteriaCover?: number;
  FH_DepSoilCover?: number;
  FH_DuffCover?: number;
  FH_EmbLitterCover?: number;
  FH_HerbLitterCover?: number;
  FH_LichenCover?: number;
  FH_MossCover?: number;
  FH_NonNoxAnnForbCover?: number;
  FH_NonNoxAnnGrassCover?: number;
  FH_NonNoxPerenForbCover?: number;
  FH_NonNoxPerenGrassCover?: number;
  FH_NonNoxShrubCover?: number;
  FH_NonNoxSubShrubCover?: number;
  FH_NonNoxSucculentCover?: number;
  FH_NonNoxTreeCover?: number;
  FH_NoxAnnForbCover?: number;
  FH_NoxAnnGrassCover?: number;
  FH_NoxPerenForbCover?: number;
  FH_NoxPerenGrassCover?: number;
  FH_NoxShrubCover?: number;
  FH_NoxSubShrubCover?: number;
  FH_NoxSucculentCover?: number;
  FH_NoxTreeCover?: number;
  FH_RockCover?: number;
  FH_SagebrushCover?: number;
  FH_TotalLitterCover?: number;
  FH_VagrLichenCover?: number;
  FH_WaterCover?: number;
  FH_WoodyLitterCover?: number;
  GapCover_101_200?: number;
  GapCover_200_plus?: number;
  GapCover_25_50?: number;
  GapCover_25_plus?: number;
  GapCover_51_100?: number;
  Hgt_Forb_Avg?: number;
  Hgt_Grass_Avg?: number;
  Hgt_Herbaceous_Avg?: number;
  Hgt_NonNoxPerenGrass_Avg?: number;
  Hgt_NonSagebrushShrub_Avg?: number;
  Hgt_NoxPerenGrass_Avg?: number;
  Hgt_PerenForbGrass_Avg?: number;
  Hgt_PerenForb_Avg?: number;
  Hgt_PerenGrass_Avg?: number;
  Hgt_Sagebrush_Avg?: number;
  Hgt_Sagebrush_Live_Avg?: number;
  Hgt_ShortPerenGrass_Avg?: number;
  Hgt_TallPerenGrass_Avg?: number;
  Hgt_Woody_Avg?: number;
  Latitude_NAD83?: number;
  LocationType?: string;
  Longitude_NAD83?: number;
  NumSpp_NonNoxPlant?: number;
  NumSpp_NoxPlant?: number;
  NumSpp_PreferredForb?: number;
  PercentCoveredByEcoSite?: number;
  PlotID?: string;
  PlotKey?: string;
  PrimaryKey?: string;
  ProjectName?: string;
  RH_AnnualProd?: string;
  RH_BareGround?: string;
  RH_BioticIntegrity?: string;
  RH_CommentsBI?: string;
  RH_CommentsHF?: string;
  RH_CommentsSS?: string;
  RH_Compaction?: string;
  RH_DeadDyingPlantParts?: string;
  RH_FuncSructGroup?: string;
  RH_Gullies?: string;
  RH_HydrologicFunction?: string;
  RH_InvasivePlants?: string;
  RH_LitterAmount?: string;
  RH_LitterMovement?: string;
  RH_PedestalsTerracettes?: string;
  RH_PlantCommunityComp?: string;
  RH_ReprodCapabilityPeren?: string;
  RH_Rills?: string;
  RH_SoilSiteStability?: string;
  RH_SoilSurfLossDeg?: string;
  RH_SoilSurfResisErosion?: string;
  RH_WaterFlowPatterns?: string;
  RH_WindScouredAreas?: string;
  SagebrushShape_All_ColumnCount?: number;
  SagebrushShape_All_Predominant?: string;
  SagebrushShape_All_SpreadCount?: number;
  SagebrushShape_Live_ColumnCount?: number;
  SagebrushShape_Live_Predominant?: string;
  SagebrushShape_Live_SpreadCount?: number;
  SoilStability_All?: number;
  SoilStability_Protected?: number;
  SoilStability_Unprotected?: number;
  Spp_Nox?: string;
  Spp_PreferredForb?: string;
  Spp_Sagebrush?: string;
  Spp_ShortPerenGrass?: string;
  Spp_TallPerenGrass?: string;
  State?: string;
  TotalFoliarCover?: number;
  mlra_name?: string;
  mlrarsym?: string;
  na_l1name?: string;
  na_l2name?: string;
  us_l3name?: string;
  us_l4name?: string;
  modis_landcover?: string;
  wkb_geometry?: any;
}

export type geoIndicatorsOptionalAttributes = "AH_AnnGrassCover" | "AH_ForbCover" | "AH_GrassCover" | "AH_NonNoxAnnForbCover" | "AH_NonNoxAnnForbGrassCover" | "AH_NonNoxAnnGrassCover" | "AH_NonNoxCover" | "AH_NonNoxPerenForbCover" | "AH_NonNoxPerenForbGrassCover" | "AH_NonNoxPerenGrassCover" | "AH_NonNoxShrubCover" | "AH_NonNoxSubShrubCover" | "AH_NonNoxSucculentCover" | "AH_NonNoxTreeCover" | "AH_NonSagebrushShrubCover" | "AH_NoxAnnForbCover" | "AH_NoxAnnForbGrassCover" | "AH_NoxAnnGrassCover" | "AH_NoxCover" | "AH_NoxPerenForbCover" | "AH_NoxPerenForbGrassCover" | "AH_NoxPerenGrassCover" | "AH_NoxShrubCover" | "AH_NoxSubShrubCover" | "AH_NoxSucculentCover" | "AH_NoxTreeCover" | "AH_PerenForbCover" | "AH_PerenGrassCover" | "AH_PerenGrassForbCover" | "AH_PreferredForbCover" | "AH_SagebrushCover" | "AH_SagebrushCover_Live" | "AH_ShortPerenGrassCover" | "AH_ShrubCover" | "AH_TallPerenGrassCover" | "BareSoilCover" | "County" | "DBKey" | "DateEstablished" | "DateLoadedInDb" | "DateVisited" | "EcologicalSiteId" | "FH_CyanobacteriaCover" | "FH_DepSoilCover" | "FH_DuffCover" | "FH_EmbLitterCover" | "FH_HerbLitterCover" | "FH_LichenCover" | "FH_MossCover" | "FH_NonNoxAnnForbCover" | "FH_NonNoxAnnGrassCover" | "FH_NonNoxPerenForbCover" | "FH_NonNoxPerenGrassCover" | "FH_NonNoxShrubCover" | "FH_NonNoxSubShrubCover" | "FH_NonNoxSucculentCover" | "FH_NonNoxTreeCover" | "FH_NoxAnnForbCover" | "FH_NoxAnnGrassCover" | "FH_NoxPerenForbCover" | "FH_NoxPerenGrassCover" | "FH_NoxShrubCover" | "FH_NoxSubShrubCover" | "FH_NoxSucculentCover" | "FH_NoxTreeCover" | "FH_RockCover" | "FH_SagebrushCover" | "FH_TotalLitterCover" | "FH_VagrLichenCover" | "FH_WaterCover" | "FH_WoodyLitterCover" | "GapCover_101_200" | "GapCover_200_plus" | "GapCover_25_50" | "GapCover_25_plus" | "GapCover_51_100" | "Hgt_Forb_Avg" | "Hgt_Grass_Avg" | "Hgt_Herbaceous_Avg" | "Hgt_NonNoxPerenGrass_Avg" | "Hgt_NonSagebrushShrub_Avg" | "Hgt_NoxPerenGrass_Avg" | "Hgt_PerenForbGrass_Avg" | "Hgt_PerenForb_Avg" | "Hgt_PerenGrass_Avg" | "Hgt_Sagebrush_Avg" | "Hgt_Sagebrush_Live_Avg" | "Hgt_ShortPerenGrass_Avg" | "Hgt_TallPerenGrass_Avg" | "Hgt_Woody_Avg" | "Latitude_NAD83" | "LocationType" | "Longitude_NAD83" | "NumSpp_NonNoxPlant" | "NumSpp_NoxPlant" | "NumSpp_PreferredForb" | "PercentCoveredByEcoSite" | "PlotID" | "PlotKey" | "PrimaryKey" | "ProjectName" | "RH_AnnualProd" | "RH_BareGround" | "RH_BioticIntegrity" | "RH_CommentsBI" | "RH_CommentsHF" | "RH_CommentsSS" | "RH_Compaction" | "RH_DeadDyingPlantParts" | "RH_FuncSructGroup" | "RH_Gullies" | "RH_HydrologicFunction" | "RH_InvasivePlants" | "RH_LitterAmount" | "RH_LitterMovement" | "RH_PedestalsTerracettes" | "RH_PlantCommunityComp" | "RH_ReprodCapabilityPeren" | "RH_Rills" | "RH_SoilSiteStability" | "RH_SoilSurfLossDeg" | "RH_SoilSurfResisErosion" | "RH_WaterFlowPatterns" | "RH_WindScouredAreas" | "SagebrushShape_All_ColumnCount" | "SagebrushShape_All_Predominant" | "SagebrushShape_All_SpreadCount" | "SagebrushShape_Live_ColumnCount" | "SagebrushShape_Live_Predominant" | "SagebrushShape_Live_SpreadCount" | "SoilStability_All" | "SoilStability_Protected" | "SoilStability_Unprotected" | "Spp_Nox" | "Spp_PreferredForb" | "Spp_Sagebrush" | "Spp_ShortPerenGrass" | "Spp_TallPerenGrass" | "State" | "TotalFoliarCover" | "mlra_name" | "mlrarsym" | "na_l1name" | "na_l2name" | "us_l3name" | "us_l4name" | "modis_landcover" | "wkb_geometry";
export type geoIndicatorsCreationAttributes = Optional<geoIndicatorsAttributes, geoIndicatorsOptionalAttributes>;

export class geoIndicators extends Model<geoIndicatorsAttributes, geoIndicatorsCreationAttributes> implements geoIndicatorsAttributes {
  AH_AnnGrassCover?: number;
  AH_ForbCover?: number;
  AH_GrassCover?: number;
  AH_NonNoxAnnForbCover?: number;
  AH_NonNoxAnnForbGrassCover?: number;
  AH_NonNoxAnnGrassCover?: number;
  AH_NonNoxCover?: number;
  AH_NonNoxPerenForbCover?: number;
  AH_NonNoxPerenForbGrassCover?: number;
  AH_NonNoxPerenGrassCover?: number;
  AH_NonNoxShrubCover?: number;
  AH_NonNoxSubShrubCover?: number;
  AH_NonNoxSucculentCover?: number;
  AH_NonNoxTreeCover?: number;
  AH_NonSagebrushShrubCover?: number;
  AH_NoxAnnForbCover?: number;
  AH_NoxAnnForbGrassCover?: number;
  AH_NoxAnnGrassCover?: number;
  AH_NoxCover?: number;
  AH_NoxPerenForbCover?: number;
  AH_NoxPerenForbGrassCover?: number;
  AH_NoxPerenGrassCover?: number;
  AH_NoxShrubCover?: number;
  AH_NoxSubShrubCover?: number;
  AH_NoxSucculentCover?: number;
  AH_NoxTreeCover?: number;
  AH_PerenForbCover?: number;
  AH_PerenGrassCover?: number;
  AH_PerenGrassForbCover?: number;
  AH_PreferredForbCover?: number;
  AH_SagebrushCover?: number;
  AH_SagebrushCover_Live?: number;
  AH_ShortPerenGrassCover?: number;
  AH_ShrubCover?: number;
  AH_TallPerenGrassCover?: number;
  BareSoilCover?: number;
  County?: string;
  DBKey?: string;
  DateEstablished?: string;
  DateLoadedInDb?: string;
  DateVisited?: string;
  EcologicalSiteId?: string;
  FH_CyanobacteriaCover?: number;
  FH_DepSoilCover?: number;
  FH_DuffCover?: number;
  FH_EmbLitterCover?: number;
  FH_HerbLitterCover?: number;
  FH_LichenCover?: number;
  FH_MossCover?: number;
  FH_NonNoxAnnForbCover?: number;
  FH_NonNoxAnnGrassCover?: number;
  FH_NonNoxPerenForbCover?: number;
  FH_NonNoxPerenGrassCover?: number;
  FH_NonNoxShrubCover?: number;
  FH_NonNoxSubShrubCover?: number;
  FH_NonNoxSucculentCover?: number;
  FH_NonNoxTreeCover?: number;
  FH_NoxAnnForbCover?: number;
  FH_NoxAnnGrassCover?: number;
  FH_NoxPerenForbCover?: number;
  FH_NoxPerenGrassCover?: number;
  FH_NoxShrubCover?: number;
  FH_NoxSubShrubCover?: number;
  FH_NoxSucculentCover?: number;
  FH_NoxTreeCover?: number;
  FH_RockCover?: number;
  FH_SagebrushCover?: number;
  FH_TotalLitterCover?: number;
  FH_VagrLichenCover?: number;
  FH_WaterCover?: number;
  FH_WoodyLitterCover?: number;
  GapCover_101_200?: number;
  GapCover_200_plus?: number;
  GapCover_25_50?: number;
  GapCover_25_plus?: number;
  GapCover_51_100?: number;
  Hgt_Forb_Avg?: number;
  Hgt_Grass_Avg?: number;
  Hgt_Herbaceous_Avg?: number;
  Hgt_NonNoxPerenGrass_Avg?: number;
  Hgt_NonSagebrushShrub_Avg?: number;
  Hgt_NoxPerenGrass_Avg?: number;
  Hgt_PerenForbGrass_Avg?: number;
  Hgt_PerenForb_Avg?: number;
  Hgt_PerenGrass_Avg?: number;
  Hgt_Sagebrush_Avg?: number;
  Hgt_Sagebrush_Live_Avg?: number;
  Hgt_ShortPerenGrass_Avg?: number;
  Hgt_TallPerenGrass_Avg?: number;
  Hgt_Woody_Avg?: number;
  Latitude_NAD83?: number;
  LocationType?: string;
  Longitude_NAD83?: number;
  NumSpp_NonNoxPlant?: number;
  NumSpp_NoxPlant?: number;
  NumSpp_PreferredForb?: number;
  PercentCoveredByEcoSite?: number;
  PlotID?: string;
  PlotKey?: string;
  PrimaryKey?: string;
  ProjectName?: string;
  RH_AnnualProd?: string;
  RH_BareGround?: string;
  RH_BioticIntegrity?: string;
  RH_CommentsBI?: string;
  RH_CommentsHF?: string;
  RH_CommentsSS?: string;
  RH_Compaction?: string;
  RH_DeadDyingPlantParts?: string;
  RH_FuncSructGroup?: string;
  RH_Gullies?: string;
  RH_HydrologicFunction?: string;
  RH_InvasivePlants?: string;
  RH_LitterAmount?: string;
  RH_LitterMovement?: string;
  RH_PedestalsTerracettes?: string;
  RH_PlantCommunityComp?: string;
  RH_ReprodCapabilityPeren?: string;
  RH_Rills?: string;
  RH_SoilSiteStability?: string;
  RH_SoilSurfLossDeg?: string;
  RH_SoilSurfResisErosion?: string;
  RH_WaterFlowPatterns?: string;
  RH_WindScouredAreas?: string;
  SagebrushShape_All_ColumnCount?: number;
  SagebrushShape_All_Predominant?: string;
  SagebrushShape_All_SpreadCount?: number;
  SagebrushShape_Live_ColumnCount?: number;
  SagebrushShape_Live_Predominant?: string;
  SagebrushShape_Live_SpreadCount?: number;
  SoilStability_All?: number;
  SoilStability_Protected?: number;
  SoilStability_Unprotected?: number;
  Spp_Nox?: string;
  Spp_PreferredForb?: string;
  Spp_Sagebrush?: string;
  Spp_ShortPerenGrass?: string;
  Spp_TallPerenGrass?: string;
  State?: string;
  TotalFoliarCover?: number;
  mlra_name?: string;
  mlrarsym?: string;
  na_l1name?: string;
  na_l2name?: string;
  us_l3name?: string;
  us_l4name?: string;
  modis_landcover?: string;
  wkb_geometry?: any;

  // geoIndicators belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof geoIndicators {
    geoIndicators.init({
    AH_AnnGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_ForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_GrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxAnnForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxAnnForbGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxAnnGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxPerenForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxPerenForbGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxSubShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxSucculentCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonNoxTreeCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NonSagebrushShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxAnnForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxAnnForbGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxAnnGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxPerenForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxPerenForbGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxSubShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_NoxSucculentCover: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AH_NoxTreeCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_PerenForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_PerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_PerenGrassForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_PreferredForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_SagebrushCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_SagebrushCover_Live: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_ShortPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_ShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_TallPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    BareSoilCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    County: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateEstablished: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateVisited: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    EcologicalSiteId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    FH_CyanobacteriaCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_DepSoilCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_DuffCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_EmbLitterCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_HerbLitterCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_LichenCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_MossCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxAnnForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxAnnGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxPerenForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxSubShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxSucculentCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NonNoxTreeCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxAnnForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxAnnGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxPerenForbCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxPerenGrassCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxSubShrubCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_NoxSucculentCover: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FH_NoxTreeCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_RockCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_SagebrushCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_TotalLitterCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_VagrLichenCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_WaterCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    FH_WoodyLitterCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapCover_101_200: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapCover_200_plus: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapCover_25_50: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapCover_25_plus: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapCover_51_100: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Forb_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Grass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Herbaceous_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_NonNoxPerenGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_NonSagebrushShrub_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_NoxPerenGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_PerenForbGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_PerenForb_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_PerenGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Sagebrush_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Sagebrush_Live_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_ShortPerenGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_TallPerenGrass_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Woody_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Latitude_NAD83: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    LocationType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Longitude_NAD83: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    NumSpp_NonNoxPlant: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    NumSpp_NoxPlant: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    NumSpp_PreferredForb: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PercentCoveredByEcoSite: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PlotID: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PlotKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PrimaryKey: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'dataHeader',
        key: 'PrimaryKey'
      }
    },
    ProjectName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_AnnualProd: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_BareGround: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_BioticIntegrity: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_CommentsBI: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_CommentsHF: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_CommentsSS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_Compaction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_DeadDyingPlantParts: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_FuncSructGroup: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_Gullies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_HydrologicFunction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_InvasivePlants: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_LitterAmount: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_LitterMovement: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_PedestalsTerracettes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_PlantCommunityComp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_ReprodCapabilityPeren: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_Rills: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_SoilSiteStability: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_SoilSurfLossDeg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_SoilSurfResisErosion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_WaterFlowPatterns: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RH_WindScouredAreas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SagebrushShape_All_ColumnCount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SagebrushShape_All_Predominant: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SagebrushShape_All_SpreadCount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SagebrushShape_Live_ColumnCount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SagebrushShape_Live_Predominant: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SagebrushShape_Live_SpreadCount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SoilStability_All: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SoilStability_Protected: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SoilStability_Unprotected: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Spp_Nox: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Spp_PreferredForb: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Spp_Sagebrush: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Spp_ShortPerenGrass: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Spp_TallPerenGrass: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    State: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TotalFoliarCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    mlra_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mlrarsym: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    na_l1name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    na_l2name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_l3name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    us_l4name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    modis_landcover: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    wkb_geometry: {
      type: DataTypes.GEOMETRY('GEOMETRY', 4326),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geoIndicators',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_geoindicators_pk",
        fields: [
          { name: "PrimaryKey" },
        ]
      },
    ]
  });
  return geoIndicators;
  }
}
