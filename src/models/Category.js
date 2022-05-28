import Sequelize, { Model } from 'sequelize';

export default class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Categoria já existe',
          },
          validate: {
            len: {
              args: [3, 50],
              msg: 'O Nome precisa ter entre 3 e 50 caracteres.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'categories',
      },
    );
    return this;
  }
}
