import Vehicle from '../models/vehicle.model.js';

const createVehicle = async (vehicle) => {
  try {
    return await Vehicle.create(vehicle);
  } catch (err) {
    throw err;
  }
};

const   getVehicles = async ({
  name,
  type,
  minPrice,
  maxPrice,
  season,
  transmission,
  capacity,
  page,
  limit,
}) => {
  try {
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // case-insensitive search
    }

    // Type: Exact match
    if (type) {
      query.type = { $regex: type, $options: 'i' }; // case-insensitive search
    }

    if (minPrice || maxPrice) {
      query['pricing.perDay'] = {};
      if (minPrice) query['pricing.perDay'].$gte = minPrice;
      if (maxPrice) query['pricing.perDay'].$lte = maxPrice;
    }

    if (season) {
      query['pricing.seasonalDiscounts.season'] = {
        $regex: season,
        $options: 'i',
      };
    }

    if (transmission) {
      query.transmission = transmission;
    }

    if (capacity) {
      query['capacity.passengers'] = { $gte: capacity };
    }

    const totalVehicles = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    return {
      vehicles,
      totalPages: Math.ceil(totalVehicles / limit),
    };
  } catch (err) {
    throw err;
  }
};

const getVehicleById = async (id) => {
  try {
    return await Vehicle.findById(id);
  } catch (err) {
    throw err;
  }
};

const updateVehicle = async (id, details) => {
  try {
    return await Vehicle.findByIdAndUpdate(id, details, { new: true });
  } catch (err) {
    throw err;
  }
};

const deleteVehicle = async (id) => {
  try {
    return await Vehicle.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

export {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
