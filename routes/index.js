const express = require("express");
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model"); // Import the product model
const userModel = require("../models/user-model");

router.get('/', (req, res) => {
    let error = req.flash("error")
    res.render('index', { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {; 
    try {
        const products = await productModel.find(); // Fetch products from the database
        let success = req.flash("success") // Pass products to the view
        res.render("shop", { products, success });
    } catch (err) {
        req.flash("error", "Could not retrieve products");
        res.render('/');
    }
});

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart");

    res.render("cart", {user});
    })

router.get("/addtocart/:productid", isLoggedIn, async (req, res) =>{
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
})

router.get("/logout", isLoggedIn, (req, res) => {
    res.render('/')
})

module.exports = router;
