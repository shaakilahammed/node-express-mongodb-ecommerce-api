const CryptoJS = require('crypto-js');
const Order = require('../../models/Order');

// CREATE
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL order
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({ crearedAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(err);
  }
};

// GET
exports.getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
exports.editOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500), json(error);
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Order deleted');
  } catch (error) {
    res.status(500).json(err);
  }
};

// DELETE
exports.getIncome = async (req, res) => {
  const month = req.query.month ? req.query.month : 1;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - month));
  //   const previosMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      {
        $project: { month: { $month: '$createdAt' }, sales: '$amount' },
      },
      {
        $group: { _id: '$month', total: { $sum: '$sales' } },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(err);
  }
};
