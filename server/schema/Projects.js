/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projects', {
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    pdescription: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    pownid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    min_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    max_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ptotalfinal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fund_endtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pro_endtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ppic: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    postime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    pstatus: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Projects'
  });
};
