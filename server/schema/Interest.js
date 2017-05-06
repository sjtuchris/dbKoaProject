/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Interest', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'uid'
      }
    },
    tname: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'tname'
      }
    }
  }, {
    tableName: 'Interest'
  });
};
