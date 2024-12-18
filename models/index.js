'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const Types = require('utils/types');

// /**
//  * @type {Types.DbConnection}
//  */
const db = {};
const models = process.cwd() + '/models/' || __dirname;

let sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_DATABASE_NAME,
  process.env.NEXT_PUBLIC_DATABASE_USERNAME,
  process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
  {
    "host": process.env.NEXT_PUBLIC_DATABASE_HOST,
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "logging": false,
    'timezone': '+08:00',
  },
);

fs.readdirSync(models)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file.slice(-3) === '.js' && file !== 'index.js'
    );
  })
  .forEach(async file => {
    const model = require(`../models/${file}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db