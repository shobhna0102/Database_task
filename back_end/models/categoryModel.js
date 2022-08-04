const Joi = require('joi');

const mongoose = require('mongoose');

const category = new mongoose.Schema({
    categoryName: { type: String, min: 3, max: 255 },
    categoryDescription: { type: String, min: 3, max: 255 },
    price: { type: Number },
    images: { type: String },

});
const categoryModel = mongoose.model('categories', category);

function validateCategoryDetail(cat) {
    const schema = Joi.object({
        categoryName: Joi.string().min(3).max(255).required(),
        categoryDescription: Joi.string(),
        price: Joi.number(),
        images: Joi.string()


    });
    return schema.validate(cat);
}
module.exports = { categoryModel, validateCategoryDetail }