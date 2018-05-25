const Sequelize = require('sequelize');

export var connectDb = function(db) {
  const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.server,
    dialect: 'mssql',
    port: db.port,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}


