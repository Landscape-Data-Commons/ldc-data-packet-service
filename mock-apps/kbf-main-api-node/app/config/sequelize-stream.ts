import QueryStream  from 'pg-query-stream'
import { Sequelize } from 'sequelize/types';


class SequelizeStream {

  constructor(pSequelize:any, pSql:any, pProcessTransform:any, pProcessEnd:any) {
      this.batchSize = 16;

      this.sequelize = pSequelize;
      this.sql              = pSql;
      this.processTransform = pProcessTransform;
      this.processEnd       = pProcessEnd;

      this.conn  = undefined;
      this.query = undefined;
  }

  end(err) {
      const self = this;
      console.log('Sequelize stream end()');
      self.query.close(() => {
          self.sequelize.connectionManager.releaseConnection(self.conn)
              .then(() => null)
              .catch(() => null)
      });
      if (err) {
          console.warn('Warning: ', err);
      }

      console.log('Calling ProcessEnd');
      self.processEnd();
  }

  async init() {
      console.log('Sequelize stream init()');
      this.conn = await (this.sequelize).connectionManager.getConnection({
          type: 'SELECT'
      });

      this.query = (this.conn).query(new QueryStream(this.sql, undefined, {
          batchSize: this.batchSize,
          types: {
              getTypeParser: (this.conn).getTypeParser.bind(this.conn)
          }
      }));
  }

  async stream() {
      await this.init();

      const modifier = through2.obj((obj, _, cb) => {
          try {
              cb(null, this.processTransform(obj));
          } catch (ex) {
              console.error('Could not execute transform', ex);
              this.end();
          }
      });

      let out = pump(this.query, modifier, (err) => this.end(err));

      return out;
  }

}

export {SequelizeStream};