const ProductModel = require("../models/Product");

exports.getProducts = async (req, res) => {
    try {

        const { limit, page, active } = req.body;


        const pagination = {
            limit: limit || 2,
            page: page || 0
        }

        let filter = {};

        console.log(active)
        if(active === false || active === true){
            filter.active = active;
        }

        console.log(filter);

        const products = await ProductModel.find(
            filter,
            {
                __v: false,
                // _id: false,
                // price: false,
                // stock: false
            }
        )
        .limit(pagination.limit)
        .skip(pagination.page)

        res.status(200).json({
            success: true,
            data: products
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            messageg: "Internal server error!"
        })
    }
}


exports.createProduct = async(req, res) => {
    try {
        
        console.log(req.body)
        
        const product = await ProductModel.create(req.body)

        res.status(201).json({
            success: true,
            data: product
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            messageg: "Internal server error!"
        })
    }
}