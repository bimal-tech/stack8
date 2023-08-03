const mongoose = require("mongoose")
const {titleSchema, statusSchema, indexSchema} =  require("./title.schema");

const CategorySchemaDef= new mongoose.Schema({
    ...titleSchema,
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    summary: {
        type: String
    },
    image: {
        type: String,
    },
    ...statusSchema,
    brand: [{
        type: mongoose.Types.ObjectId,
        ref: "Label",
        default: null
    }]
}, indexSchema);

const CategoryModel = mongoose.model("Category", CategorySchemaDef)
module.exports = CategoryModel;