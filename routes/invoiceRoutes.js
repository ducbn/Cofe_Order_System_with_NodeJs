const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authRequired } = require('../middlewares/authMiddleware');

router.get('/', authRequired, invoiceController.getAllInvoices);
router.post('/', authRequired, invoiceController.createInvoice);
router.put('/:id', authRequired, invoiceController.updateInvoice);
router.delete('/:id', authRequired, invoiceController.deleteInvoice);

module.exports = router;
