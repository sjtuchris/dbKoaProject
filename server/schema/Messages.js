/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Messages', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'uid'
      }
    },
    mcontent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    mtime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Messages'
  });
};
