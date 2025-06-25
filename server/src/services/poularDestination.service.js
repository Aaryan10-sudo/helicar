const PopularDestination = require("../../models/popularDestination.model");

async function createPopularDestinationService(data) {
  try {
    const destination = await PopularDestination.create(data);
    return destination;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getPopularDestinationsService() {
  try {
    const destinations = await PopularDestination.findAll();
    return destinations;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getPopularDestinationByNameService(name) {
  try {
    const destination = await PopularDestination.findOne({ where: { name } });
    if (!destination) {
      throw new Error("Popular destination not found");
    }
    return destination;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updatePopularDestinationService(id, data) {
  try {
    const [updatedRows] = await PopularDestination.update(data, {
      where: { id },
    });
    if (updatedRows === 0) {
      throw new Error("Popular destination not found or no changes made");
    }
    const updatedDestination = await PopularDestination.findByPk(id);
    return updatedDestination;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deletePopularDestinationService(id) {
  try {
    const deletedRows = await PopularDestination.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error("Popular destination not found");
    }
    return { message: "Popular destination deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createPopularDestinationService,
  getPopularDestinationsService,
  getPopularDestinationByNameService,
  updatePopularDestinationService,
  deletePopularDestinationService,
};
