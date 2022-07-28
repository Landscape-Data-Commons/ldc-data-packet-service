import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface dataLPIAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  SpacingIntervalAmount?: number;
  SpacingType?: string;
  ShowCheckbox?: number;
  CheckboxLabel?: string;
  PrimaryKey?: string;
  DBKey?: string;
  PointLoc?: number;
  PointNbr?: number;
  ShrubShape?: string;
  layer?: string;
  code?: string;
  chckbox?: number;
  ProjectKey?: string;
  DateLoadedInDb?: string;
}

export type dataLPIOptionalAttributes = "LineKey" | "RecKey" | "DateModified" | "FormType" | "FormDate" | "Direction" | "Measure" | "LineLengthAmount" | "SpacingIntervalAmount" | "SpacingType" | "ShowCheckbox" | "CheckboxLabel" | "PrimaryKey" | "DBKey" | "PointLoc" | "PointNbr" | "ShrubShape" | "layer" | "code" | "chckbox" | "ProjectKey" | "DateLoadedInDb";
export type dataLPICreationAttributes = Optional<dataLPIAttributes, dataLPIOptionalAttributes>;

export class dataLPI extends Model<dataLPIAttributes, dataLPICreationAttributes> implements dataLPIAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  SpacingIntervalAmount?: number;
  SpacingType?: string;
  ShowCheckbox?: number;
  CheckboxLabel?: string;
  PrimaryKey?: string;
  DBKey?: string;
  PointLoc?: number;
  PointNbr?: number;
  ShrubShape?: string;
  layer?: string;
  code?: string;
  chckbox?: number;
  ProjectKey?: string;
  DateLoadedInDb?: string;

  // dataLPI belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dataLPI {
    dataLPI.init({
    LineKey: {
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
    Direction: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Measure: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    LineLengthAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpacingIntervalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpacingType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ShowCheckbox: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    CheckboxLabel: {
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
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PointLoc: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PointNbr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ShrubShape: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    layer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    chckbox: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataLPI',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_lpi_pk",
        fields: [
          { name: "PrimaryKey" },
          { name: "PointLoc" },
          { name: "RecKey" },
          { name: "LineKey" },
        ]
      },
    ]
  });
  return dataLPI;
  }
}
