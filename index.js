const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on 5000');
});
