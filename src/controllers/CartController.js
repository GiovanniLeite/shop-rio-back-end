import { Op } from 'sequelize';
import Cart from '../models/Cart';

class CartController {
  async index(req, res) {
    try {
      let where = {};

      const { idUser } = req.params;
      const { cartCode } = req.params;
      if (idUser && cartCode) {
        where = {
          user_id: idUser,
          [Op.and]: { cart_code: cartCode },
        };
      }
      const data = await Cart.findAll({
        order: [['id', 'DESC']],
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const data = await Cart.create(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Cart.findByPk(id, {
        order: ['id'],
      });

      if (!data) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }

      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Cart.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }
      await data.destroy();

      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Cart.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }

      const dataAtt = await data.update(req.body);

      return res.json(dataAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CartController();
