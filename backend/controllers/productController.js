const ProductModel= require('../models/productModel');

//get Products API - /api/v1/products
exports.getProducts = async (req , res , next ) =>{
    const query =  req.query.keyword?{name : {
        $regex: req.query.keyword,
        $options : 'i'
    }}:{}
    const products = await ProductModel.find(query);//asynchronous method
        res.json({
            success:true,
            products,
            
        })       
}

//get Single Product By Id API - /api/v1/product/:id

exports.getSingleProduct = async(req , res , next ) =>{


    //to get the id by using req.params 
    try{                                                                //try catch is used to used to handle the errors
    const product = await ProductModel.findById(req.params.id);
    res.json({
        success:true,
        product

    })    
}
    catch(error){
        res.status(404).json({
            success:false,
            message: error.message    //we can give our own message also.
        }) 
    }

}

