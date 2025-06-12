const express = require('express');
const router = express.Router();

const menuItemController = require('../controllers/menuItemController');
const { authRequired } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/authMiddleware');

router.post('/', authRequired, requireRole('admin'), menuItemController.createMenuItem);
router.get('/', authRequired, menuItemController.getAllMenuItems);
router.put('/:id', authRequired, requireRole('admin'), menuItemController.updateMenuItem);
router.delete('/:id', authRequired, requireRole('admin'), menuItemController.deleteMenuItem);

module.exports = router;
