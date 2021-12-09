'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function (models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
  };
  return Note;
};
