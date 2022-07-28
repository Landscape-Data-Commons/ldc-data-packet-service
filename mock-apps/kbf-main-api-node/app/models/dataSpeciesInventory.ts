import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface dataSpeciesInventoryAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  SpecRichMethod?: number;
  SpecRichMeasure?: number;
  SpecRichNbrSubPlots?: number;
  SpecRich1Container?: number;
  SpecRich1Shape?: number;
  SpecRich1Dim1?: number;
  SpecRich1Dim2?: number;
  SpecRich1Area?: number;
  SpecRich2Container?: number;
  SpecRich2Shape?: number;
  SpecRich2Dim1?: number;
  SpecRich2Dim2?: number;
  SpecRich2Area?: number;
  SpecRich3Container?: number;
  SpecRich3Shape?: number;
  SpecRich3Dim1?: number;
  SpecRich3Dim2?: number;
  SpecRich3Area?: number;
  SpecRich4Container?: number;
  SpecRich4Shape?: number;
  SpecRich4Dim1?: number;
  SpecRich4Dim2?: number;
  SpecRich4Area?: number;
  SpecRich5Container?: number;
  SpecRich5Shape?: number;
  SpecRich5Dim1?: number;
  SpecRich5Dim2?: number;
  SpecRich5Area?: number;
  SpecRich6Container?: number;
  SpecRich6Shape?: number;
  SpecRich6Dim1?: number;
  SpecRich6Dim2?: number;
  SpecRich6Area?: number;
  Notes?: string;
  DateLoadedInDb?: string;
  PrimaryKey?: string;
  DBKey?: string;
  Species?: string;
  ProjectKey?: string;
  DENSITY?: number;
}

export type dataSpeciesInventoryOptionalAttributes = "LineKey" | "RecKey" | "DateModified" | "FormType" | "FormDate" | "SpecRichMethod" | "SpecRichMeasure" | "SpecRichNbrSubPlots" | "SpecRich1Container" | "SpecRich1Shape" | "SpecRich1Dim1" | "SpecRich1Dim2" | "SpecRich1Area" | "SpecRich2Container" | "SpecRich2Shape" | "SpecRich2Dim1" | "SpecRich2Dim2" | "SpecRich2Area" | "SpecRich3Container" | "SpecRich3Shape" | "SpecRich3Dim1" | "SpecRich3Dim2" | "SpecRich3Area" | "SpecRich4Container" | "SpecRich4Shape" | "SpecRich4Dim1" | "SpecRich4Dim2" | "SpecRich4Area" | "SpecRich5Container" | "SpecRich5Shape" | "SpecRich5Dim1" | "SpecRich5Dim2" | "SpecRich5Area" | "SpecRich6Container" | "SpecRich6Shape" | "SpecRich6Dim1" | "SpecRich6Dim2" | "SpecRich6Area" | "Notes" | "DateLoadedInDb" | "PrimaryKey" | "DBKey" | "Species" | "ProjectKey" | "DENSITY";
export type dataSpeciesInventoryCreationAttributes = Optional<dataSpeciesInventoryAttributes, dataSpeciesInventoryOptionalAttributes>;

export class dataSpeciesInventory extends Model<dataSpeciesInventoryAttributes, dataSpeciesInventoryCreationAttributes> implements dataSpeciesInventoryAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  SpecRichMethod?: number;
  SpecRichMeasure?: number;
  SpecRichNbrSubPlots?: number;
  SpecRich1Container?: number;
  SpecRich1Shape?: number;
  SpecRich1Dim1?: number;
  SpecRich1Dim2?: number;
  SpecRich1Area?: number;
  SpecRich2Container?: number;
  SpecRich2Shape?: number;
  SpecRich2Dim1?: number;
  SpecRich2Dim2?: number;
  SpecRich2Area?: number;
  SpecRich3Container?: number;
  SpecRich3Shape?: number;
  SpecRich3Dim1?: number;
  SpecRich3Dim2?: number;
  SpecRich3Area?: number;
  SpecRich4Container?: number;
  SpecRich4Shape?: number;
  SpecRich4Dim1?: number;
  SpecRich4Dim2?: number;
  SpecRich4Area?: number;
  SpecRich5Container?: number;
  SpecRich5Shape?: number;
  SpecRich5Dim1?: number;
  SpecRich5Dim2?: number;
  SpecRich5Area?: number;
  SpecRich6Container?: number;
  SpecRich6Shape?: number;
  SpecRich6Dim1?: number;
  SpecRich6Dim2?: number;
  SpecRich6Area?: number;
  Notes?: string;
  DateLoadedInDb?: string;
  PrimaryKey?: string;
  DBKey?: string;
  Species?: string;
  ProjectKey?: string;
  DENSITY?: number;

  // dataSpeciesInventory belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dataSpeciesInventory {
    dataSpeciesInventory.init({
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
    SpecRichMethod: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRichMeasure: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRichNbrSubPlots: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich1Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich1Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich1Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich1Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich1Area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich2Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich2Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich2Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich2Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich2Area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich3Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich3Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich3Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich3Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich3Area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich4Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich4Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich4Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich4Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich4Area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich5Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich5Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich5Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich5Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich5Area: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich6Container: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich6Shape: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich6Dim1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich6Dim2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    SpecRich6Area: {
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
    Species: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DENSITY: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataSpeciesInventory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_speciesinventory_pk",
        fields: [
          { name: "PrimaryKey" },
          { name: "LineKey" },
          { name: "RecKey" },
          { name: "Species" },
        ]
      },
    ]
  });
  return dataSpeciesInventory;
  }
}
