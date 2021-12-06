'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'liberi@fatali.com',
        username: 'SquallLeonhart',
        hashedPassword: bcrypt.hashSync('whatever')
      }
    ], {});

    await queryInterface.bulkInsert('Notebooks', [
      { name: 'The First Notebook', userId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {})

    return await queryInterface.bulkInsert('Notes', [
      { name: null, content: null, userId: 1, notebookId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Notes', null, {})
    await queryInterface.bulkDelete('Notebooks', null, {})
    return await queryInterface.bulkDelete('Users', null, {})
  }
};
