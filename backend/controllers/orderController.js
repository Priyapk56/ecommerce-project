const orderModel = require('../models/orderModel');

//create order API - api/v1/order
exports.createOrder =  async(req, res, next) =>{
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item)=>(acc + item.product.price * item.qty),0)).toFixed(2);
    const status ='pending';
    const orders  =await orderModel.create({cartItems , amount,status})

    res.json({
            success:true,
            orders

        })
}               