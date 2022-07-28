import type { Sequelize, Model } from "sequelize";
import { geoSpecies } from "./geoSpecies";
import { geoIndicators } from "./geoIndicators"
import { dataGap } from "./dataGap"
import { dataHeader } from "./dataHeader"
import { dataHeight } from "./dataHeight"
import { dataLPI } from "./dataLPI"
import { dataSoilStability } from "./dataSoilStability"
import { dataSpeciesInventory } from "./dataSpeciesInventory"
import type { geoSpeciesAttributes, geoSpeciesCreationAttributes } from "./geoSpecies";
import type { geoIndicatorsAttributes, geoIndicatorsCreationAttributes } from "./geoIndicators";
import type { dataGapAttributes, dataGapCreationAttributes } from "./dataGap";
import type { dataHeaderAttributes, dataHeaderCreationAttributes } from "./dataHeader";
import type { dataHeightAttributes, dataHeightCreationAttributes } from "./dataHeight";
import type { dataLPIAttributes, dataLPICreationAttributes } from "./dataLPI";
import type { dataSoilStabilityAttributes, dataSoilStabilityCreationAttributes } from "./dataSoilStability";
import type { dataSpeciesInventoryAttributes, dataSpeciesInventoryCreationAttributes } from "./dataSpeciesInventory";


export {
  geoSpecies,
  geoIndicators,
  dataGap,
  dataHeader,
  dataHeight,
  dataLPI,
  dataSoilStability,
  dataSpeciesInventory
};

export type {
  geoSpeciesAttributes,
  geoSpeciesCreationAttributes,

  geoIndicatorsAttributes,
  geoIndicatorsCreationAttributes,

  dataGapAttributes,
  dataGapCreationAttributes,

  dataHeaderAttributes,
  dataHeaderCreationAttributes,

  dataHeightAttributes,
  dataHeightCreationAttributes,

  dataLPIAttributes, 
  dataLPICreationAttributes,

  dataSoilStabilityAttributes,
  dataSoilStabilityCreationAttributes,

  dataSpeciesInventoryAttributes,
  dataSpeciesInventoryCreationAttributes


};

export function initModels(sequelize: Sequelize) {
  geoSpecies.initModel(sequelize);
  geoIndicators.initModel(sequelize);
  dataGap.initModel(sequelize);
  dataHeight.initModel(sequelize);
  dataLPI.initModel(sequelize);
  dataSoilStability.initModel(sequelize);
  dataSpeciesInventory.initModel(sequelize);

  // geoSpecies.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(geoSpecies, { as: "geoSpecies", foreignKey: "PrimaryKey"});

  // geoIndicators.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(geoIndicators, { as: "geoIndicators", foreignKey: "PrimaryKey"});

  // dataGap.belongsTo(dataHeader, { as: "dataGap", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(dataGap, { as: "dataGap", foreignKey: "PrimaryKey"});

  // dataHeight.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(dataHeight, { as: "dataHeight", foreignKey: "PrimaryKey"});

  // dataLPI.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(dataLPI, { as: "dataLPI", foreignKey: "PrimaryKey"});

  // dataSoilStability.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(dataSoilStability, { as: "dataSoilStability", foreignKey: "PrimaryKey"});

  // dataSpeciesInventory.belongsTo(dataHeader, { as: "PrimaryKey_dataHeader", foreignKey: "PrimaryKey"});
  // dataHeader.hasMany(dataSpeciesInventory, { as: "dataSpeciesInventory", foreignKey: "PrimaryKey"});

  return {
    geoSpecies: geoSpecies,
    geoIndicators: geoIndicators,
    dataGap: dataGap,
    dataHeader: dataHeader,
    dataLPI: dataLPI,
    dataSoilStability: dataSoilStability,
    dataSpeciesInventory: dataSpeciesInventory
  };
}
