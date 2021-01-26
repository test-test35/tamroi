import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        day: { type: String, required: true },
        month: { type: String, required: true },
        year: { type: String, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // isPaid: { type: Boolean, default: false },
    // paidAt: { type: Date },
    // isDelivered: { type: Boolean, default: false },
    // deliveredAt: { type: Date },
},
{
    timestamps: true,
}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;