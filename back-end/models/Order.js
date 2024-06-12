const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // buyer
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
    },
            
    // products: [
    //     {
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Product',
    //             required: true,
    //         },
    //         quantity: {
    //             type: Number,
    //             required: true,
    //         },
    //     },
    // ],
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending',
    },
    // paymentMethod: { type: String, required: true },
    // paymentResult: {
    //     id: { type: String },
    //     status: { type: String },
    //     update_time: { type: String },
    //     email_address: { type: String },
    // },
    // taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    // pdfLink: { type: String, required: true },  // Link to the generated PDF file
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);