import express from 'express';
import { validateRole } from '../validators/role.validate.js';
import {
  createRole,
  getAll,
  removeRole,
} from '../controllers/role.controller.js';

const router = express.Router();

router.post('/', validateRole, createRole);
router.get('/', getAll);
router.delete('/:id', removeRole);

export default router;
