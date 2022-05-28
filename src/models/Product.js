import Sequelize, { Model } from 'sequelize';

export default class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo nome deve ter entre 3 e 50 caracteres',
            },
          },
        },
        price: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        old_price: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        discount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        category_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'products',
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Picture, { foreignKey: 'product_id' });
  }
}
