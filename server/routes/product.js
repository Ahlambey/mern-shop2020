const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/product");

const { auth } = require("../middleware/auth");
const product = require("../models/product");

// store product image inside a folder.
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).send("only jpg and png are allowed"), false);
    }
    cd(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//           Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  // after getting image from the cient we save it in node server
  // we use Multer library

  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uplaodProduct", auth, (req, res) => {
  // save the data we get from the client into the DB
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// gets all products or the products that much the filters stored in sortby
// gets products that much search terms
router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "-1";
  // limit is the number of products displayed on the page.
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;

  let skip = parseInt(req.body.skip);

  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      // partcial text search
      .find({ title: { $regex: term, $options: "i" } })
      // full text search
      // .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((error, products) => {
        if (error) return res.status(400).json({ success: false, error });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((error, products) => {
        if (error) return res.status(400).json({ success: false, error });
        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});
// navigate to the product using its id to get product details
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }
  // find product information based on product id

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((error, product) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(product);
    });
});

module.exports = router;
