const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const productFunction = require("./productHandling");
const catagaryFunction = require("./catagaryHandling");
const { validationResult } = require("express-validator");
module.exports.post_product = async (req, res, filename) => {
    const { name, description, category_id } = req.body;
    const token = req.cookies.jwt || req.header("Authorization");

    try {
        // G
        const decoded = jwt.verify(token, "secreat key ");
        // Add the product
        productFunction.add_product(decoded.id, name, description, category_id);
        console.log("Product added.", "     ", description);

        // Add the product image
        productFunction.addImage(name, filename);
        console.log("Product image added.");

        // Respond to the client
        res.status(200).json({ message: "Product added successfully." });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({
            error: "An error occurred while adding the product.",
        });
    }
};
module.exports.update_product = async (req, res, id, dirname, filename) => {
    console.log("uoyade fuction called");
    const { name, description, category_id } = req.body;

    try {
        if (name) {
            console.log("name", name);
            await productFunction.update_product_name(id, name);
        }
        if (description) {
            console.log("description", description);
            await productFunction.update_product_description(id, description);
        }
        if (category_id) {
            console.log("category_id", category_id);
            await productFunction.update_product_catagary_id(id, category_id);
        }

        if (filename) {
            console.log("filename", filename);
            let currentImagePath = await productFunction.get_product_by_id(id);
            console.log("++++++++++++", currentImagePath);
            if (currentImagePath.image_path) {
                const fullPath = path.join(
                    dirname,
                    currentImagePath.image_path
                );
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${fullPath}:`, err);
                    } else {
                        console.log(`File ${fullPath} deleted successfully`);
                    }
                });
            }
            console.log(filename);
            await productFunction.addImage_by_id(id, filename);
            console.log("Product image added.");
        }

        // Respond to the client
        res.status(200).json({ message: "Product added successfully." });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({
            error: "An error occurred while adding the product.",
        });
    }
};

module.exports.post_catagary = async (req, res) => {
    const { name, descripation } = req.body;
    const token = req.cookies.jwt || req.header("Authorization");

    try {
        const decoded = jwt.verify(token, "secreat key ");
        let resulat = await catagaryFunction.add_catagary(
            decoded.id,
            name,
            descripation
        );
        res.json(resulat);
    } catch (err) {
        console.log("ERROR", err);
    }
};
module.exports.update_catagary = async (req, res) => {
    console.log("called function");

    let id = req.params.id;
    const { name, descripation } = req.body;
    try {
        if (name) {
            catagaryFunction.update_catagary_name(id, name);
        }
        if (descripation) {
            catagaryFunction.update_catagary_descripation(id, descripation);
        }
        res.json({
            message: "updated succc",
        });
    } catch (err) {
        console.log("ERROR", err);
    }
};
module.exports.get_products_by_name_or_category_id = async (req, res) => {
    const { name, id } = req.query;

    try {
        //

        let products;
        if (id) {
            products = await productFunction.get_product_by_catagary_id(id);
        } else {
            console;
            products = await productFunction.get_product_by_name(name);
        }

        if (!products || products.length === 0) {
            res.status(404).send("No products found");
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error("Error retrieving products:", err);
        res.status(500).send("An error occurred while retrieving products.");
    }
};
module.exports.delete_product = (req, res) => {
    let id = req.params.id;
    try {
        productFunction.delet_product(id);
        res.status(200).json({ message: "Product delete successfully." });
    } catch (err) {
        console.log("ERROR", err);
    }
};
module.exports.delete_catagary = async (req, res) => {
    let id = req.params.id;

    try {
        const result = await catagaryFunction.delet_catagary(id);
        res.status(200).send("delet succ....");
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports.getAllProducts = async (req, res) => {
    try {
        const result = await productFunction.get_products();

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(300).send(error);
    }
};
