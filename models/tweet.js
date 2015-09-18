"use strict";
module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Tweet", {
    content: DataTypes.STRING,
    owned: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Tweet;
};