import Sequelize, { Model } from 'sequelize';

export default class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        postal_code: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo cep deve ter entre 3 e 50 caracteres',
            },
          },
        },
        house_number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo endereço deve ter entre 3 e 50 caracteres',
            },
          },
        },
        district: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo bairro deve ter entre 3 e 50 caracteres',
            },
          },
        },
        obs: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'addresses',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
