import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dataHeader, dataHeaderId } from './dataHeader';

export interface geoSpeciesAttributes {
  AH_SpeciesCover?: number;
  AH_SpeciesCover_n?: number;
  DBKey?: string;
  Duration?: string;
  GrowthHabit?: string;
  GrowthHabitSub?: string;
  Hgt_Species_Avg?: number;
  Hgt_Species_Avg_n?: number;
  Noxious?: string;
  PlotID?: string;
  PrimaryKey?: string;
  SG_Group?: string;
  Species?: string;
  DateLoadedInDb?: string;
  SpeciesKey?: string;
  Public?: boolean;
}

export type geoSpeciesOptionalAttributes = "AH_SpeciesCover" | "AH_SpeciesCover_n" | "DBKey" | "Duration" | "GrowthHabit" | "GrowthHabitSub" | "Hgt_Species_Avg" | "Hgt_Species_Avg_n" | "Noxious" | "PlotID" | "PrimaryKey" | "SG_Group" | "Species" | "DateLoadedInDb" | "SpeciesKey" | "Public";
export type geoSpeciesCreationAttributes = Optional<geoSpeciesAttributes, geoSpeciesOptionalAttributes>;

export class geoSpecies extends Model<geoSpeciesAttributes, geoSpeciesCreationAttributes> implements geoSpeciesAttributes {
  AH_SpeciesCover?: number;
  AH_SpeciesCover_n?: number;
  DBKey?: string;
  Duration?: string;
  GrowthHabit?: string;
  GrowthHabitSub?: string;
  Hgt_Species_Avg?: number;
  Hgt_Species_Avg_n?: number;
  Noxious?: string;
  PlotID?: string;
  PrimaryKey?: string;
  SG_Group?: string;
  Species?: string;
  DateLoadedInDb?: string;
  SpeciesKey?: string;
  Public?: boolean;

  // geoSpecies belongsTo dataHeader via PrimaryKey
  PrimaryKey_dataHeader!: dataHeader;
  getPrimaryKey_dataHeader!: Sequelize.BelongsToGetAssociationMixin<dataHeader>;
  setPrimaryKey_dataHeader!: Sequelize.BelongsToSetAssociationMixin<dataHeader, dataHeaderId>;
  createPrimaryKey_dataHeader!: Sequelize.BelongsToCreateAssociationMixin<dataHeader>;

  static initModel(sequelize: Sequelize.Sequelize): typeof geoSpecies {
    geoSpecies.init({
    AH_SpeciesCover: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    AH_SpeciesCover_n: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DBKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Duration: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GrowthHabit: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GrowthHabitSub: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Hgt_Species_Avg: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Hgt_Species_Avg_n: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Noxious: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PlotID: {
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
    SG_Group: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Species: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateLoadedInDb: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SpeciesKey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Public: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geoSpecies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_geospecies_pk",
        fields: [
          { name: "PrimaryKey" },
        ]
      },
    ]
  });
  return geoSpecies;
  }
}
