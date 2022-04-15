'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    
  }
  News.init({
    news_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};