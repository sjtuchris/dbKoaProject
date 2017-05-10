/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rates', {
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
    rpoint: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false
    },
    ratime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Rates'
  });
};
