const ProductModel = require("../models/product.model");

class ProductService {
    addProduct = (data) => {
        let prod = new ProductModel(data);
        return prod.save();
    }

    validateProduct = (data) => {
        let err = [];
        if(data.title ==  null){
            err.push({title: "Title is required"});
        }
        if(data.price <= 0){
            err.push({price: "Price should be greater than zero"});
        }

        if(err.length >0){
            throw err;
        } else {
            return;
        }
    }

    getAllProducts = () => {
        return ProductModel.find()
        .populate('category')
        .populate('brand')
        .populate('seller');
    }

    getProductByid = (id) => {
        return ProductModel.findById(id)
        .populate('category')
        .populate('brand')
        .populate('seller');
    }

    deleteById = (id) => {
        return ProductModel.findByIdAndDelete(id);
    }

    updateProduct = (id, data) => {
        return ProductModel.findByIdAndUpdate(id, {
            $set: data 
        })
    }
}

module.exports = ProductService;