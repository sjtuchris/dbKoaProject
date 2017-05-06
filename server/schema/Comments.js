/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comments', {
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
    ccontent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    like_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    unlike_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Comments'
  });
};
