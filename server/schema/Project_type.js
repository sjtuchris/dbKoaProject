/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project_type', {
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'pid'
      }
    },
    tname: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'tname'
      }
    }
  }, {
    tableName: 'Project_type'
  });
};
