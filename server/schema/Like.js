/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'uid'
      }
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'pid'
      }
    },
    like: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'Like'
  });
};
