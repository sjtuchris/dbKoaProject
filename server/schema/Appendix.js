/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Appendix', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Updates',
        key: 'uid'
      }
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Updates',
        key: 'pid'
      }
    },
    apcontent: {
      type: "BLOB",
      allowNull: false
    },
    apdescription: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    utime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true,
      references: {
        model: 'Updates',
        key: 'utime'
      }
    },
    atype: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'Appendix'
  });
};
