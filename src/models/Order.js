import Sequelize, { Model } from 'sequelize';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Nome do pedido 3 e 50 caracteres',
            },
          },
        },
        total: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cart_code: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        delivered: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
