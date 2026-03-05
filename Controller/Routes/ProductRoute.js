import express from "express";
import {
  Addproduct,
  deleteproduct,
  getAllproduct,
  getSingleproduct,
  updateProduct,
} from "../Productcontroller.js";

const router = express.Router();

router.route("/products").get(getAllproduct).post(Addproduct);

// router.get("/product/:id", getSingleproduct)
// router.get("/product/:id", Updateproduct);
// router.get("/product/:id", deleteproduct);

router
  .route("/product/:id")
  .get(getSingleproduct)
  .put(updateProduct)
  .delete(deleteproduct);

export default router;
