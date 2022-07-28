import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface dataGapAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  GapMin?: number;
  GapData?: number;
  PerennialsCanopy?: number;
  AnnualGrassesCanopy?: number;
  AnnualForbsCanopy?: number;
  OtherCanopy?: number;
  Notes?: string;
  NoCanopyGaps?: number;
  NoBasalGaps?: number;
  DateLoadedInDb?: string;
  PerennialsBasal?: number;
  AnnualGrassesBasal?: number;
  AnnualForbsBasal?: number;
  OtherBasal?: number;
  PrimaryKey?: string;
  DBKey?: string;
  SeqNo?: string;
  RecType?: string;
  GapStart?: number;
  GapEnd?: number;
  Gap?: number;
  ProjectKey?: string;
}

export type dataGapOptionalAttributes = "LineKey" | "RecKey" | "DateModified" | "FormType" | "FormDate" | "Direction" | "Measure" | "LineLengthAmount" | "GapMin" | "GapData" | "PerennialsCanopy" | "AnnualGrassesCanopy" | "AnnualForbsCanopy" | "OtherCanopy" | "Notes" | "NoCanopyGaps" | "NoBasalGaps" | "DateLoadedInDb" | "PerennialsBasal" | "AnnualGrassesBasal" | "AnnualForbsBasal" | "OtherBasal" | "PrimaryKey" | "DBKey" | "SeqNo" | "RecType" | "GapStart" | "GapEnd" | "Gap" | "ProjectKey";
export type dataGapCreationAttributes = Optional<dataGapAttributes, dataGapOptionalAttributes>;

export class dataGap extends Model<dataGapAttributes, dataGapCreationAttributes> implements dataGapAttributes {
  LineKey?: string;
  RecKey?: string;
  DateModified?: string;
  FormType?: string;
  FormDate?: string;
  Direction?: string;
  Measure?: number;
  LineLengthAmount?: number;
  GapMin?: number;
  GapData?: number;
  PerennialsCanopy?: number;
  AnnualGrassesCanopy?: number;
  AnnualForbsCanopy?: number;
  OtherCanopy?: number;
  Notes?: string;
  NoCanopyGaps?: number;
  NoBasalGaps?: number;
  DateLoadedInDb?: string;
  PerennialsBasal?: number;
  AnnualGrassesBasal?: number;
  AnnualForbsBasal?: number;
  OtherBasal?: number;
  PrimaryKey?: string;
  DBKey?: string;
  SeqNo?: string;
  RecType?: string;
  GapStart?: number;
  GapEnd?: number;
  Gap?: number;
  ProjectKey?: string;

  // dataGap belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dataGap {
    dataGap.init({
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
      type: DataTypes.TEXT,
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
    GapMin: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapData: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PerennialsCanopy: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AnnualGrassesCanopy: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AnnualForbsCanopy: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OtherCanopy: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    NoCanopyGaps: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    NoBasalGaps: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PerennialsBasal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AnnualGrassesBasal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AnnualForbsBasal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    OtherBasal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PrimaryKey: {
      type: DataTypes.STRING(100),
      allowNull: true,
      primaryKey:true,
      references: {
        model: 'dataHeader',
        key: 'PrimaryKey'
      }
    },
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SeqNo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RecType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GapStart: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    GapEnd: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Gap: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ProjectKey: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataGap',
    schema: 'public',
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['Id'] }
    },  
    indexes: [
      {
        name: "idx_gap_pk_seqno_gapstart",
        fields: [
          { name: "PrimaryKey" },
          { name: "SeqNo" },
          { name: "GapStart" },
          { name: "GapEnd" },
        ]
      },
    ]
  });
  return dataGap;
  }
}
