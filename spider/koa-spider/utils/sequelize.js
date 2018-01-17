const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'spider',
    'root',
    '123456',
    {
        host:'localhost',
        dialect: 'mysql',
        port:3306
    }
);

sequelize.authenticate()
  .then(function(err) {
    // console.log('Connection has been established successfully.');
  }).catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;