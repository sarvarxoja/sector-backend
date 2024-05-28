import { Router } from "express";
import { upload } from "../utils/multer.js";
import prouctsController from "../Controller/proucts.controller.js";
import productMiddleware from "../Middleware/product.middleware.js";
import tokenMiddleware from "../Middleware/token.middleware.js";

export const product_router = Router();

product_router
  .post(
    "/product/create",
    // tokenMiddleware.checkAdminToken,
    upload.single("product_img"),
    productMiddleware.checkProduct,
    prouctsController.createProduct
  )
  // .get("/product", ProuctsController.findQuery)
  .get("/product", prouctsController.findProduct)
  .get("/product/:id", prouctsController.findProductId)
  .delete(
    "/product/:id",
    tokenMiddleware.checkAdminToken,
    prouctsController.deleteProduct
  );
