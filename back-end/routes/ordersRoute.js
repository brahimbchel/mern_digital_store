const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, deleteOrder } = require('../controllers/orderControllers');

router.post('/', createOrder);

router.get('/', getAllOrders)

router.get('/:id', getOrderById)

router.put('/:id/pay', updateOrderToPaid)

router.put('/:id/deliver', updateOrderToDelivered)


router.delete('/:id', deleteOrder)


module.exports = router