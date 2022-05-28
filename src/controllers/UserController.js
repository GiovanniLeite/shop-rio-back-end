import Address from '../models/Address';
import User from '../models/User';
import { Op } from 'sequelize';

class UserController {
  // Index
  async index(req, res) {
    try {
      if (req.adm === 2) {
        let where = { [Op.and]: { [Op.or]: [{ adm: 1 }, { adm: 2 }] } };

        const { name } = req.params;

        if (name) {
          where = {
            name: { [Op.like]: `%${name}%` },
            [Op.and]: { [Op.or]: [{ adm: 1 }, { adm: 2 }] },
          };
        }

        const users = await User.findAll({
          attributes: [
            'id',
            'name',
            'cpf',
            'birth_date',
            'phone',
            'cell',
            'email',
            'open_cart',
            'adm',
            'current_cart_code',
          ],
          order: ['id'],
          where,
        });
        return res.json(users);
      } else {
        return res.status(401).json({
          errors: ['Não autorizado.'],
        });
      }
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: [
          'id',
          'name',
          'cpf',
          'birth_date',
          'phone',
          'cell',
          'email',
          'open_cart',
          'adm',
          'current_cart_code',
        ],
        order: [[Address, 'id', 'DESC']],
        include: {
          model: Address,
        },
      });

      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // Store
  async store(req, res) {
    try {
      if (req.adm === 2) {
        const newUser = await User.create(req.body);
        newUser.password_hash = '';
        return res.json(newUser);
      } else {
        const newReqBody = req.body;
        newReqBody.adm = 0;
        const newUser = await User.create(newReqBody);
        newUser.password_hash = '';
        return res.json(newUser);
      }
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      let user = null;
      let newData = null;
      if (req.adm === 2) {
        // only adm lv 2 can change everything
        // the id that was indicated (req.params.id)
        user = await User.findByPk(req.params.id);
        if (!user) {
          return res.status(400).json({
            errors: ['Usuário não existe.'],
          });
        }
        newData = await user.update(req.body);
      } else if (req.adm === 1 && req.params.isCartCodeUpdate) {
        // adm nv 1 can just change another user's cart
        // the id that was indicated (req.params.id)
        user = await User.findByPk(req.params.id);
        if (!user) {
          return res.status(400).json({
            errors: ['Usuário não existe.'],
          });
        }

        newData = await user.update({
          open_cart: req.body.open_cart,
          current_cart_code: req.body.current_cart_code,
        });
      } else {
        // only himself (req.userId)
        user = await User.findByPk(req.userId);
        if (!user) {
          return res.status(400).json({
            errors: ['Usuário não existe.'],
          });
        }
        const newReqBody = req.body;
        if (req.adm !== 1) {
          newReqBody.adm = 0;
        }
        newData = await user.update(newReqBody);
      }
      newData.password_hash = '';
      return res.json(newData);
      // let a = 'aaa';
      // a = req.params.isCartCodeUpdate;
      // return res.json(a);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      let user = {};

      if (req.adm === 2) {
        // the id that was indicated (req.params.id)
        user = await User.findByPk(req.params.id);
      } else {
        // only himself (req.userId)
        user = await User.findByPk(req.userId);
      }

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
