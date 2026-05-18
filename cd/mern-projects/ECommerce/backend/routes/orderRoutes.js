const express = require('express');
const router = express.Router();
const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').delete(deleteOrder);

module.exports = router;
