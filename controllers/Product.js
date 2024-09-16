const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
      return res.status(200).json({
        success: false,
        message: "all fields are required!",
      });
    }
    const product = await Product.create({
      name,
      category,
      price,
    });
    return res.status(201).json({
      success: true,
      data: product,
      message: "product added successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // const allProducts = await Product.find(
    //   {},
    //   {
    //     _id: false,
    //   }
    // );
    return res.status(200).json({
      success: true,
      data: allProducts,
      message: "all data fetched successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(499).json({
        success: false,
        message: "invalid product objcet id",
      });
    }
    return res.status(200).json({
      data: product,
      message: "product information fetch successfully",
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.changePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPrice } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { price: newPrice },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(499).json({
        success: false,
        message: "invalid product objcet id",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "product price updated!",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const removedProduct = await Product.findByIdAndDelete({ _id: id });
    if (!removedProduct) {
      return res.status(499).json({
        success: false,
        message: "invalid product objcet id",
      });
    }
    return res.status(201).json({
      success: true,
      data: removedProduct,
      message: "product deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: e.message,
    });
  }
};
