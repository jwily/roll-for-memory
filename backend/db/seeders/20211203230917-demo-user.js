'use strict';
// const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'liberi@fatali.com',
        username: 'SquallLeonhart',
        hashedPassword: bcrypt.hashSync('whatever'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await queryInterface.bulkInsert('Notebooks', [
      { name: 'The First Notebook', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sessions', userId: 1, createdAt: new Date(), updatedAt: tomorrow }
    ], {})

    return await queryInterface.bulkInsert('Notes', [
      { name: 'Next Session', content: '', userId: 1, notebookId: 2, createdAt: yesterday, updatedAt: yesterday },
      { name: 'Last Session', content: 'What fun!', userId: 1, notebookId: 2, createdAt: yesterday, updatedAt: tomorrow },
      { name: '', content: '', userId: 1, notebookId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Notes', null, {})
    await queryInterface.bulkDelete('Notebooks', null, {})
    return await queryInterface.bulkDelete('Users', null, {})
  }
};
