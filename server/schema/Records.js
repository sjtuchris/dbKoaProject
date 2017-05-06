/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Records', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Cards',
        key: 'uid'
      }
    },
    cnum: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Cards',
        key: 'cnum'
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
    ramount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    retime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Records'
  });
};
