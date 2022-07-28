import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
  process.env.DBSTR!, {
  dialect: 'postgres',
  // logger: (sql, timing) => logger.info(sql, typeof timing ==='number'? `Elapsed time: ${timing}ms`: ''),
  // operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const db:any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


export {db}