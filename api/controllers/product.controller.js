const { createSlug } = require("../utilities/helpers");
const ProductService = require("../services/product.service");
const prod_svc = new ProductService();

class ProductController {
    addProduct = async (req, res, next) => {
        try{
            let data = req.body;
            
            prod_svc.validateProduct(data);
            
            data['slug'] = createSlug(data.title);
            // data['category'] = data.category ?? null;
            if(!data.category) {
                data['category'] =  null;
            }
            data['after_discount'] = Number(data.price) - Number(data.price) * Number(data.discount) / 100;
            data['is_featured'] = data.is_featured ?? false;
            // data['seller'] = data.seller ?? null;
            if(!data.seller) {
                data['seller'] =  null;
            }
            if(req.files){
                let images = [];
                req.files.map((image) => {
                    images.push(image.filename);
                })
                data['images'] = images;
            }
            console.log(data);
            let save = await prod_svc.addProduct(data);
            res.json({
                result: data,
                status: true,
                msg: "Product created successfully."
            })
        } catch(error){
            next({status: 400, msg: (error)})
        }

    }

    listAllProducts = async (req, res, next) => {
        try {
            let products = await prod_svc.getAllProducts({});
            res.json({
                result: products,
                status: true,
                msg: "All products fetched"
            })
        } catch (error) {
            console.log(error);
            next({
                status: 400, msg: error
            })
        }
    }

    getProductByid = async (req, res, next) => {
        try{
            let product = await prod_svc.getProductByid(req.params.id)
            res.json({
                result: product,
                status: true,
                msg: "Product fetched"
            })
        } catch (error) {
            next({status: 400, msg: JSON.stringify(error)});
        }
    }

    deleteProductById = async (req, res, next) => {
        try {
            let del = await prod_svc.deleteById(req.params.id);
            res.json({
                result: null,
                status: true,
                msg: "Product Deleted successfully"
            })
        } catch(error) {
            next({status: 400, msg: JSON.stringify(error)})
        }
    }

    updateProduct = async (req, res, next) => {
        try{
            let data = req.body;
            
            prod_svc.validateProduct(data);
        
            if(!data.category) {
                data['category'] =  null;
            }
            data['after_discount'] = Number(data.price) - Number(data.price) * Number(data.discount) / 100;
            data['is_featured'] = data.is_featured ?? false;
            if(!data.seller) {
                data['seller'] =  null;
            }
            let images = data.images;
            
            if(req.files){
                req.files.map((image) => {
                    images.push(image.filename);
                })
                data['images'] = images;
            }
            let save = await prod_svc.updateProduct(req.params.id, data);
            res.json({
                result: data,
                status: true,
                msg: "Product Updated successfully."
            })
        } catch(error){
            next({status: 400, msg: (error)})
        }

    }
}
module.exports = ProductController;