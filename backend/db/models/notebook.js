'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Notebook.associate = function (models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId', onDelete: 'cascade', hooks: true });
  };
  return Notebook;
};
