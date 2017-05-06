/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tags', {
    tname: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      primaryKey: true
    },
    tdescription: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    tableName: 'Tags'
  });
};
