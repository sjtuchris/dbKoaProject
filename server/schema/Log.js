module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Log', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customers',
        key: 'uid'
      }
    },
    lcontent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    ltype: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    ltime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    }
  }, {
    tableName: 'Log'
  });
};
