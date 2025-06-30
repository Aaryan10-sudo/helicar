"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Vehicles", "driverInfo", {
      type: Sequelize.JSONB,
      allowNull: true,
    });

    await queryInterface.addColumn("Vehicles", "vehicleBooking", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn("PopularDestinations", "pricing", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Vehicles", "driverInfo");
    await queryInterface.removeColumn("Vehicles", "vehicleBooking");
  },
};
