'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //await queryInterface.removeColumn('Appointments', 'slot');

   

    await queryInterface.addColumn('Appointments', 'startTime', {
      type: Sequelize.TIME
      
    });

    await queryInterface.addColumn('Appointments', 'endTime', {
      type: Sequelize.TIME
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Appointments', 'slot', {
      type: Sequelize.DATE,
      
    });

    await queryInterface.removeColumn('Appointments', 'date');
    await queryInterface.removeColumn('Appointments', 'startTime');
    await queryInterface.removeColumn('Appointments', 'endTime');
  }
};
