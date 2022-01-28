const CryptoJS = require('crypto-js');
const Cart = require('../../models/Cart');

// CREATE
exports.createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL Cart
exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find().sort({ crearedAt: -1 });

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(err);
  }
};

// GET
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
exports.editCart = async (req, res) => {
  console.log(req.params.id);
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500), json(error);
  }
};

// DELETE
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart deleted');
  } catch (error) {
    res.status(500).json(err);
  }
};
