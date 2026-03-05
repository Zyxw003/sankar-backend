import productModel from "../models/productModel.js";

import errorMiddleware from "../Middleware/Error.js";
import APIHELPER from "../Helper/Apihelper.js";
import HandleError from "../Helper/handleError.js";
//create products
export const Addproduct = async (req, res, next) => {
  //console.log(req.body);
  const product = await productModel.create(req.body);
  if (!product) return next(new errorMiddleware("product not found", 404));

  return res.status(201).json({
    success: true,
    product,
  });
};
export const deleteproduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return next(new errorMiddleware("product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllproduct = async (req, res,next) => {
  // const products = await productModel.find();
  const ResultsperPage = 4;
  const apihelper = new APIHELPER(productModel.find(), req.query)
    .search()
    .filter();
  const FilterQuery = apihelper.query.clone();
  const productCount = await FilterQuery.countDocuments();
  const Totalpages = Math.ceil(productCount / ResultsperPage);
  const page = Number(req.query.page) || 1;
  if (Totalpages > 0 && page > Totalpages) {
    return next(new HandleError("This page doesn`t exit ", 404));
  }
  apihelper.pagination(ResultsperPage);

  const products = await apihelper.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    ResultsperPage,
    Totalpages,
    currentPage: page,
  });
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new errorMiddleware("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// get single productbyid
export const getSingleproduct = async (req, res) => {
  const id = req.params.id;
  let product = await productModel.findById(id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
};
