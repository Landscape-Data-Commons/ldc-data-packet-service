import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface dataSoilStabilityAttributes {
  PlotKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  LineKey?: string;
  SoilStabSubSurface?: number;
  Notes?: string;
  DateLoadedInDb?: string;
  PrimaryKey?: string;
  DBKey?: string;
  Position?: number;
  Line?: string;
  Pos?: string;
  Veg?: string;
  Rating?: number;
  Hydro?: number;
  ProjectKey?: string;
}

export type dataSoilStabilityOptionalAttributes = "PlotKey" | "RecKey" | "DateModified" | "FormType" | "FormDate" | "LineKey" | "SoilStabSubSurface" | "Notes" | "DateLoadedInDb" | "PrimaryKey" | "DBKey" | "Position" | "Line" | "Pos" | "Veg" | "Rating" | "Hydro" | "ProjectKey";
export type dataSoilStabilityCreationAttributes = Optional<dataSoilStabilityAttributes, dataSoilStabilityOptionalAttributes>;

export class dataSoilStability extends Model<dataSoilStabilityAttributes, dataSoilStabilityCreationAttributes> implements dataSoilStabilityAttributes {
  PlotKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  LineKey?: string;
  SoilStabSubSurface?: number;
  Notes?: string;
  DateLoadedInDb?: string;
  PrimaryKey?: string;
  DBKey?: string;
  Position?: number;
  Line?: string;
  Pos?: string;
  Veg?: string;
  Rating?: number;
  Hydro?: number;
  ProjectKey?: string;

  // dataSoilStability belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dataSoilStability {
    dataSoilStability.init({
    PlotKey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    RecKey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DateModified: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    FormType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    FormDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    LineKey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SoilStabSubSurface: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.DATEONLY,
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
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Position: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Line: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Pos: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Veg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hydro: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataSoilStability',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_soilstability_pk",
        fields: [
          { name: "PrimaryKey" },
          { name: "PlotKey" },
          { name: "Position" },
          { name: "Pos" },
        ]
      },
    ]
  });
  return dataSoilStability;
  }
}
