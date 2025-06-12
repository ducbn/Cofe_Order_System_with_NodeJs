const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');
const { authRequired } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/authMiddleware');

router.get('/', authRequired, tableController.getAllTables);
router.post('/', authRequired, requireRole('admin'), tableController.createTable);
router.put('/:id', authRequired, requireRole('admin'), tableController.updateTable);
router.delete('/:id', authRequired, requireRole('admin'), tableController.deleteTable);

module.exports = router;
