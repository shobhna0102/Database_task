var express = require('express');
var router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const multer = require('multer');
const logger = require('../logger')
const { categoryModel, validateCategoryDetail } = require("../models/categoryModel")


/* GET home page. */

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, res, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {

      var filetype = '';
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      callback(null, 'image-' + "-" + Date.now() + '.' + filetype);
    },
  }),
}).single("images");


router.post("/categoryAdd", upload, async (req, res) => {

  try {
    const { error } = validateCategoryDetail(req.body);

    if (error) {
      logger.log({
        message: "categoryAdd: parameter are missing",
        level: "error",

      });
      return res.status(400).send(error.details[0].message);
    }
    let category = await categoryModel.findOne({ categoryName: req.body.categoryName });
    console.log('@@@@@@@@@@', category);
    if (category) {
      logger.log({
        message: " category: category name already exists",
        level: "info",

      });
      return res.status(400).send("category name already exists...");
    }
    console.log("REQ>FILE", req.file)
    const productData = new categoryModel(
      // _.pick(req.body, [
      //   "category_id",
      //   "product_name",
      //   "description",
      //   "price",
      //   "createdAt",
      //   "updatedAt",
      // ]) 
      {
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        images: req.file.path,  //update this
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
      });
    await productData.save();
    res.send(
      _.pick(productData, [
        "category_id",
        "product_name",
        "description",
        "price",
        "images",
        "createdAt",
        "updatedAt", ,
      ])
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
