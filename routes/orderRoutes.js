const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authRequired } = require('../middleware/authMiddleware');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', authRequired, orderController.deleteOrder);

module.exports = router;
