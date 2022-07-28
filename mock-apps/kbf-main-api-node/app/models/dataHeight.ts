import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface dataHeightAttributes {
  PrimaryKey?: string;
  DBKey?: string;
  PointLoc?: number;
  PointNbr?: number;
  RecKey?: string;
  Height?: number;
  Species?: string;
  Chkbox?: number;
  type?: string;
  GrowthHabit_measured?: string;
  LineKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  SpacingIntervalAmount?: number;
  SpacingType?: string;
  HeightOption?: string;
  HeightUOM?: string;
  ShowCheckbox?: number;
  CheckboxLabel?: string;
  ProjectKey?: string;
  DateLoadedInDb?: string;
}

export type dataHeightOptionalAttributes = "PrimaryKey" | "DBKey" | "PointLoc" | "PointNbr" | "RecKey" | "Height" | "Species" | "Chkbox" | "type" | "GrowthHabit_measured" | "LineKey" | "DateModified" | "FormType" | "FormDate" | "Direction" | "Measure" | "LineLengthAmount" | "SpacingIntervalAmount" | "SpacingType" | "HeightOption" | "HeightUOM" | "ShowCheckbox" | "CheckboxLabel" | "ProjectKey" | "DateLoadedInDb";
export type dataHeightCreationAttributes = Optional<dataHeightAttributes, dataHeightOptionalAttributes>;

export class dataHeight extends Model<dataHeightAttributes, dataHeightCreationAttributes> implements dataHeightAttributes {
  PrimaryKey?: string;
  DBKey?: string;
  PointLoc?: number;
  PointNbr?: number;
  RecKey?: string;
  Height?: number;
  Species?: string;
  Chkbox?: number;
  type?: string;
  GrowthHabit_measured?: string;
  LineKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  SpacingIntervalAmount?: number;
  SpacingType?: string;
  HeightOption?: string;
  HeightUOM?: string;
  ShowCheckbox?: number;
  CheckboxLabel?: string;
  ProjectKey?: string;
  DateLoadedInDb?: string;

  // dataHeight belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dataHeight {
    dataHeight.init({
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
    RecKey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Height: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Species: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Chkbox: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GrowthHabit_measured: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LineKey: {
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
      type: DataTypes.STRING(100),
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
    HeightOption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    HeightUOM: {
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
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataHeight',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_height_pk",
        fields: [
          { name: "PrimaryKey" },
          { name: "PointLoc" },
          { name: "RecKey" },
          { name: "LineKey" },
        ]
      },
    ]
  });
  return dataHeight;
  }
}
