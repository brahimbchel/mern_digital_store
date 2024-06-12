const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    imageLink: {
        type: [String],
        default: ['https://th.bing.com/th/id/R.8fae22f0f838b9eea9f95848c8965807?rik=gkWhDFNyhrxqiQ&pid=ImgRaw&r=0']
    },
    link: { 
        type: String, 
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);