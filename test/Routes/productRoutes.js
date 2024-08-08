const { Router } = require("express");
const user = require("../control/authCont");
const router = Router();
const fs = require("fs");
const multer = require("multer");
const admincheck = require("../middleware/middlewareAuth").adminAuth;
const schema = require("../schema/schemas");
const valdation = require("../middleware/middlewareValdation");
const productContral = require("../product_handling/controlProduct");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./uploads";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix =
            Date.now() + "-" + crypto.randomBytes(6).toString("hex");
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });
router.post(
    "/login",
    valdation.login_middleware(schema.login_scheme),
    user.login_post
);
router.post(
    "/signup",
    valdation.signup_middleware(schema.signup_scheme),
    user.signup_post
);
router.post("/logout", user.logout);

router.post(
    "/addProduct",
    [
        upload.single("image"),
        valdation.add_product_middleware(schema.add_product_scheme),
        admincheck,
    ],
    async (req, res) => {
        if (req.file) {
            await productContral.post_product(req, res, req.file.filename);
        } else {
            await productContral.post_product(req, res, null);
        }
    }
);
router.get(
    "/product",
    [valdation.get_product_middleware(schema.get_product_scheme), admincheck],
    productContral.get_products_by_name_or_category_id
);
router.post(
    "/addCategory",
    [valdation.add_category_middleware(schema.add_category_scheme), admincheck],
    productContral.post_catagary
);
router.post(
    "/update/:id",
    [
        valdation.update_middleware(
            schema.update_scheme_params,
            schema.update_scheme_body,
            admincheck
        ),
        upload.single("image"),
    ],
    async (req, res) => {
        let dirname = path.join(__dirname, "/uploads");
        let filename;
        if (req.file) {
            filename = req.file.filename;
        }
        await productContral.update_product(
            req,
            res,
            req.params.id,
            dirname,
            filename
        );
    }
);
router.post(
    "/updateCatagary/:id",
    [
        valdation.update_middleware(
            schema.update_scheme_params,
            schema.update_scheme_body,
            admincheck
        ),
    ],
    productContral.update_catagary
);
router.delete(
    "/delete/:id",
    [valdation.delete_middleware(schema.delete_schema), admincheck],
    productContral.delete_product
);
router.delete(
    "/deleteCatagary/:id",
    [valdation.delete_middleware(schema.delete_schema), admincheck],
    productContral.delete_catagary
);
router.get("/allProducts", admincheck, productContral.getAllProducts);

module.exports = router;
