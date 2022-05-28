import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Address from '../models/Address';
import Notification from '../models/Notification';
import Category from '../models/Category';
import Product from '../models/Product';
import Picture from '../models/Picture';
import Wishlist from '../models/Wishlist';
import Cart from '../models/Cart';
import Order from '../models/Order';

const models = [
  User,
  Address,
  Notification,
  Category,
  Product,
  Picture,
  Wishlist,
  Cart,
  Order,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
