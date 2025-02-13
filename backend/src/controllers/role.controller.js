import Role from '../models/role.model.js';
import {
  create,
  deleteRole,
  getRoleById,
  getRoles,
} from '../services/role.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createRole = asyncHandler(async (req, res) => {
  const input = req.body;

  // Check if role already exists
  const roleExists = await Role.findOne({ name: input.name });

  if (roleExists) {
    res.status(400);
    throw new Error('Role already exists');
  }

  const newRole = await create(input);
  return res.status(201).json({
    success: true,
    data: newRole,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const roles = await getRoles();
  return res.status(200).json({
    success: true,
    data: roles,
  });
});

const removeRole = asyncHandler(async (req, res) => {
  const role = await getRoleById(req.params.id);

  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  await deleteRole(req.params.id);

  return res.status(200).json({
    success: true,
    message: 'Role deleted successfully',
  });
});

export { createRole, getAll, removeRole };
