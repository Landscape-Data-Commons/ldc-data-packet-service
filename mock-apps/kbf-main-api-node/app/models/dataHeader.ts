import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dataHeaderAttributes {
  PrimaryKey: string;
  SpeciesState?: string;
  PlotID?: string;
  PlotKey?: string;
  DBKey?: string;
  EcologicalSiteId?: string;
  Latitude_NAD83?: number;
  Longitude_NAD83?: number;
  State?: string;
  County?: string;
  DateEstablished?: string;
  DateLoadedInDb?: string;
  ProjectName?: string;
  ProjectKey?: string;
  LocationType?: string;
  DateVisited?: string;
  PercentCoveredByEcoSite?: number;
  wkb_geometry?: any;
}

export type dataHeaderPk = "PrimaryKey";
export type dataHeaderId = dataHeader[dataHeaderPk];
export type dataHeaderOptionalAttributes = "PrimaryKey" | "SpeciesState" | "PlotID" | "PlotKey" | "DBKey" | "EcologicalSiteId" | "Latitude_NAD83" | "Longitude_NAD83" | "State" | "County" | "DateEstablished" | "DateLoadedInDb" | "ProjectName" | "ProjectKey" | "LocationType" | "DateVisited" | "PercentCoveredByEcoSite" | "wkb_geometry";
export type dataHeaderCreationAttributes = Optional<dataHeaderAttributes, dataHeaderOptionalAttributes>;

export class dataHeader extends Model<dataHeaderAttributes, dataHeaderCreationAttributes> implements dataHeaderAttributes {
  PrimaryKey!: string;
  SpeciesState?: string;
  PlotID?: string;
  PlotKey?: string;
  DBKey?: string;
  EcologicalSiteId?: string;
  Latitude_NAD83?: number;
  Longitude_NAD83?: number;
  State?: string;
  County?: string;
  DateEstablished?: string;
  DateLoadedInDb?: string;
  ProjectName?: string;
  ProjectKey?: string;
  LocationType?: string;
  DateVisited?: string;
  PercentCoveredByEcoSite?: number;
  wkb_geometry?: any;


  static initModel(sequelize: Sequelize.Sequelize): typeof dataHeader {
    dataHeader.init({
    PrimaryKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    SpeciesState: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    PlotID: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PlotKey: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    EcologicalSiteId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Latitude_NAD83: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Longitude_NAD83: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    County: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DateEstablished: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ProjectName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LocationType: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DateVisited: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PercentCoveredByEcoSite: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    wkb_geometry: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataHeader',
    schema: 'public',
    timestamps: false
  });
  return dataHeader;
  }
}
