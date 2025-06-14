const express = require('express');
const router = express.Router();

const orderItemController = require('../controllers/orderItemController');
const { authRequired } = require('../middleware/authMiddleware');

router.get('/', orderItemController.getAllOrderItems);
router.get('/order/:orderId', orderItemController.getOrderItemsByOrderId);
router.post('/', orderItemController.createOrderItem);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', authRequired, orderItemController.deleteOrderItem);

module.exports = router;
