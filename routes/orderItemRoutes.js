const express = require('express');
const router = express.Router();

const orderItemController = require('../controllers/orderItemController');
const { authRequired } = require('../middleware/authMiddleware');

router.get('/', authRequired, orderItemController.getAllOrderItems);
router.post('/', authRequired, orderItemController.createOrderItem);
router.put('/:id', authRequired, orderItemController.updateOrderItem);
router.delete('/:id', authRequired, orderItemController.deleteOrderItem);

module.exports = router;
