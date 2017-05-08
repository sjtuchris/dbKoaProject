/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    uemail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    upassword: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ucity: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    uoccupation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    upic: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    UpdatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Customers'
  });
};
