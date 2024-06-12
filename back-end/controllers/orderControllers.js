const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        // const { user, products, paymentMethod, taxPrice, totalPrice } = req.body;
        const { user, product, totalPrice } = req.body;
        const newOrder = new Order({
            user,
            product,
            // paymentMethod,
            // taxPrice,
            totalPrice,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        // const orders = await Order.find({});
        const orders = await Order.find().populate('user', 'username email').populate('product', 'name price');

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        // order.paymentResult = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.email_address,
        // };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToDelivered, 
    deleteOrder };