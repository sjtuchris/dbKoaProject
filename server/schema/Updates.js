/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Updates', {
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
    udescription: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    utime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Updates'
  });
};
