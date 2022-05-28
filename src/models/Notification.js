import Sequelize, { Model } from 'sequelize';

export default class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [10, 50],
              msg: 'Campo mensagem deve ter entre 10 e 50 caracteres',
            },
          },
        },
        read: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'notifications',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
