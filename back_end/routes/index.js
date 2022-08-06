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
        message: " categoryAdd: category name already exists",
        level: "info",

      });
      return res.status(400).send("category name already exists...");
    }
    console.log("REQ>FILE", req.file)
    const categoryData = new categoryModel(
      // _.pick(req.body, [
      //   "category_id",
      //   "product_name",
      //   "description",
      //   "price",
      //   "createdAt",
      //   "updatedAt",
      // ]) 
      {

        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        price: req.body.price,
        images: req.file.filename,  //update this

      });
    await categoryData.save();
    res.send(
      _.pick(categoryData, [
        "categoryName",
        "categoryDescription",
        "price",
        "images",
      ])
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/categoryDelete", async (req, res) => {
  try {
    let deleteCat = await categoryModel.findByIdAndRemove(req.query.id)
    if (!deleteCat) {
      logger.log({
        message: "categoryDelete: category id does not exists ",
        level: "info",
      });
      return res.status(400).send("categoty id does not exists");
    } else {
      res.send({
        message: "category deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



router.get("/fetchCategory", async (req, res) => {
  try {
    const category = await categoryModel.find();
    console.log("@@@@@@@@@@@@@@", category);
    if (!category) {
      logger.log({
        message: "categoryFind: category does not exists ",
        level: "info",
      });
      return res.status(400).send("category does not exists");
    } else {
      res.status(200).json(category);
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/fetchCategoryid", async (req, res) => {
  try {
    const category = await categoryModel.find(req.query.id);
    console.log("@@@@@@@@@@@@@@", category);
    if (!category) {
      logger.log({
        message: "categoryFind: category does not exists ",
        level: "info",
      });
      return res.status(400).send("category does not exists");
    } else {
      res.status(200).json(category);
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.put("/updateCategory", upload, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    let id = mongoose.Types.ObjectId(req.query.id);
    console.log(id);
    const update = await categoryModel.findByIdAndUpdate(id,
      {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        price: req.body.price,
        images: req.file.filename
      })

    if (!update) {
      logger.log({
        message: "categoryUpdate: category id does not exists ",
        level: "info",
      });
      return res.status(400).send("category id does not exists");
    } else {
      res.send({ message: "category updated successfully." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});





module.exports = router;
