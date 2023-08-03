const CategoryService =  require("../services/category.service");
const { successResponse, createSlug } = require("../utilities/helpers");

const svc = new CategoryService();

class CategoryController {

    getAllCats = async (req, res, next) => {
        try {
            let response = await svc.getCategories({});
            res.json(successResponse(response, "Fetched"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }

    addCategory = async(req,res,next) => {
        try {
            let data = req.body;
            if(req.file) {
                data.image = req.file.filename;
            }
            data.slug = createSlug(data.title);
            if(!data.parent_id) {   // ""
                data.parent_id =  null;
            }
            if(!data.brand || data.brand.length == 0){
                data.brand = null;
            }
            let response = await svc.createCategory(data);

            res.json(successResponse(data, "Category created successfully"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }

    getCategoryById = async(req, res,next) => {
        try {
            let response = await svc.getCategoryById(req.params.id);
            res.json(successResponse(response, "Fetched"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }
    updateCategory = async (req, res, next) => {
        try {
            let data = req.body;
            if(req.file) {
                data.image = req.file.filename;
            }
            
            if(!data.parent_id || data.parent_id === 'null') {   // ""
                data.parent_id =  null;
            }
            if(!data.brand || data.brand.length == 0){
                data.brand = null;
            }

            console.log(data);

            let response = await svc.updateCategoryById(req.params.id, data);

            res.json(successResponse(data, "Category updated successfully"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }

    deleteCategoryById = async (req, res,next) => {
        try {
            let response = await svc.deleteCategoryById(req.params.id);
            res.json(successResponse(response, "Category Deleted successfully"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }

    getAllChilds = async (req,res,next) => {
        try {
            let filter = {
                parent_id: req.params.id
            }
            let response = await svc.getCategories(filter);
            res.json(successResponse(response, "Fetched"));
        } catch(error) {
            next({status: 500, msg: JSON.stringify(error)})
        }
    }
}

module.exports = CategoryController;