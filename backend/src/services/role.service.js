import Role from '../models/role.model.js';

const create = async (role) => {
  try {
    return await Role.create(role);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoles = async () => {
  try {
    return await Role.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoleById = async (id) => {
  try {
    return await Role.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRole = async (id) => {
  try {
    return await Role.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { create, getRoles, getRoleById, deleteRole };
