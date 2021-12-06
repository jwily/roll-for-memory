'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      type: DataTypes.STRING(255)
    },
    content: {
      type: DataTypes.TEXT
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
