const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Business = require("../models/businessModel");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const subfolder =
      file.fieldname === "shopPhotos" ? "shopPhotos" : "workPhotos";
    cb(null, path.join(__dirname, "..", "uploads", subfolder));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

router.get("/fetchallshops", async (req, res) => {
  try {
    const shops = await Business.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/addshop",
  fetchuser,
  upload.fields([
    { name: "shopPhotos", maxCount: 50 },
    { name: "workPhotos", maxCount: 50 },
  ]),
  [
    body("owner_name", "Owner's name is required").not().isEmpty(),
    body("shopname", "Shop name is required").not().isEmpty(),
    body("category_tag", "Category tag is required").not().isEmpty(),
    body("business_email", "Business email is required").isEmail(),
    body("description", "Description is required").not().isEmpty(),
    body("address", "Address is required").not().isEmpty(),
    body("country", "Country is required").not().isEmpty(),
    body("state", "State is required").not().isEmpty(),
    body("city", "City is required").not().isEmpty(),
    body("phone", "Enter a valid phone number").isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      
      const shopPhotos = req.files["shopPhotos"]
        ? req.files["shopPhotos"].map((file) => file.filename)
        : [];
      const workPhotos = req.files["workPhotos"]
        ? req.files["workPhotos"].map((file) => file.filename)
        : [];

        console.log("this are hop phoos",shopPhotos)

      const shop = new Business({
        user: req.user.id,
        owner_name: req.body.owner_name,
        shopname: req.body.shopname,
        category_tag: req.body.category_tag,
        business_email: req.body.business_email,
        description: req.body.description,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        phone: req.body.phone,
        shopPhotos: shopPhotos,
        workPhotos: workPhotos,
      });

      const shopData = await shop.save();
      res
        .status(201)
        .json({ msg: "Shop added successfully", shopData: shopData });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
);

router.put("/updateshop/:id", fetchuser, async (req, res) => {
  const {
    shopname,
    owner_name,
    category_tag,
    business_email,
    description,
    address,
  } = req.body;

  try {
    const newShop = {};
    if (shopname) {
      newShop.shopname = shopname;
    }
    if (owner_name) {
      newShop.owner_name = owner_name;
    }
    if (category_tag) {
      newShop.category_tag = category_tag;
    }
    if (business_email) {
      newShop.business_email = business_email;
    }
    if (description) {
      newShop.description = description;
    }
    if (address) {
      newShop.address = address;
    }

    let shop = await Business.findById(req.params.id);
    if (!shop) {
      return res.status(404).json("Shop not found");
    }

    if (shop.user.toString() !== req.user.id) {
      return res.status(401).json("You are not authorized to update this shop");
    }

    shop = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: newShop },
      { new: true }
    );
    res.json({ shop });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

router.delete("/deleteshop/:id", fetchuser, async (req, res) => {
  try {
    let shop = await Business.findById(req.params.id);
    if (!shop) {
      return res.status(404).json("Shop not found");
    }

    if (shop.user.toString() !== req.user.id) {
      return res.status(401).json("You are not authorized to delete this shop");
    }

    shop = await Business.findByIdAndDelete(req.params.id);
    res.json({ Success: "Shop deleted successfully", shop: shop });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/fetchshopsbycategory/:category_tag", async (req, res) => {
  try {
    const shops = await Business.find({
      category_tag: req.params.category_tag,
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/fetchparticularshop/:_id", async (req, res) => {
  try {
    const shop = await Business.find({ _id: req.params._id });
    res.send(shop[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const shops = await Business.find({
      $or: [
        { shopname: { $regex: query, $options: "i" } },
        { owner_name: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
      ],
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
