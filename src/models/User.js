import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'Campo sobrenome deve ter entre 3 e 50 caracteres',
            },
          },
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'CPF já cadastrado em outra conta',
          },
        },
        birth_date: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        cell: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        open_cart: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'Campo senha deve ter entre 6 e 50 caracteres',
            },
          },
        },
        adm: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        current_cart_code: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      },
    );

    // gancho que faz uma acao antes de alguma coisa
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id' });
    this.hasMany(models.Notification, { foreignKey: 'user_id' });
    this.hasMany(models.Wishlist, { foreignKey: 'user_id' });
    this.hasMany(models.Cart, { foreignKey: 'user_id' });
    this.hasMany(models.Order, { foreignKey: 'user_id' });
  }
}
