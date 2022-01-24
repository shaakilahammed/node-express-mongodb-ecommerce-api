const CryptoJS = require('crypto-js');
const User = require('../../models/User');

// GET ALL
exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(err);
  }
};

// GET
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.editUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500), json(error);
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User deleted');
  } catch (error) {
    res.status(500).json(err);
  }
};
