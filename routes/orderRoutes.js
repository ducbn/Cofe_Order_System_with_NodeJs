const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { authRequired } = require('../middleware/authMiddleware');

router.get('/', authRequired, orderController.getAllOrders);
router.post('/', authRequired, orderController.createOrder);
router.put('/:id', authRequired, orderController.updateOrder);
router.delete('/:id', authRequired, orderController.deleteOrder);

module.exports = router;
