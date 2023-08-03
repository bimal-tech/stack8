let Category = require("../models/category.model");
// let Brand = require("../models/labels.model");

class CategoryService {
    getCategories = (filter) => {
        return Category.find(filter).populate('brand').populate('parent_id');
    }

    getCategoryById = (id) => {
        return Category.findById(id).populate('brand').populate('parent_id');
    }

    createCategory = (data) => {
        let cat = new Category(data);
        return cat.save();
    }
    updateCategoryById = (id, data) => {
        return Category.findByIdAndUpdate(id, {
            $set: data
        })
    }
    deleteCategoryById = (id) => {
        return Category.findByIdAndDelete(id);
    }
}

module.exports = CategoryService;