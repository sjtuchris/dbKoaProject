/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Money', {
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
    mamount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    motime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Money'
  });
};
