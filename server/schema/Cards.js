/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cards', {
    cnum: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'uid'
      }
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    holder: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    tableName: 'Cards'
  });
};
