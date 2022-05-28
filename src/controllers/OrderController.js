import { Op } from 'sequelize';
import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    try {
      const data = await Order.findAll();
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async indexByDelivery(req, res) {
    try {
      let where = {};

      const { delivered } = req.params;

      if (parseInt(delivered) === 1) {
        where = {
          // 1 = delivered
          delivered,
        };
      } else if (parseInt(delivered) === 0) {
        where = {
          // 0 = not delivered
          // 2 = en route
          [Op.or]: [{ delivered: 0 }, { delivered: 2 }],
        };
      }

      const data = await Order.findAll({
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async indexByDate(req, res) {
    try {
      let where = {};

      const { start } = req.params;
      const { end } = req.params;
      const { delivered } = req.params;

      if (parseInt(delivered) === 1) {
        where = {
          created_at: {
            [Op.and]: {
              [Op.gte]: start,
              [Op.lte]: end,
            },
          },
          [Op.and]: { delivered: parseInt(delivered) },
        };
      } else if (parseInt(delivered) === 0) {
        // 0 = not delivered
        // 2 = en route
        // between start and end and delivered 0 or 1
        where = {
          created_at: {
            [Op.and]: {
              [Op.gte]: start,
              [Op.lte]: end,
            },
          },
          [Op.or]: [{ delivered: 0 }, { delivered: 2 }],
        };
      } else {
        where = {
          created_at: {
            [Op.and]: {
              [Op.gte]: start,
              [Op.lte]: end,
            },
          },
        };
      }

      const data = await Order.findAll({
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async indexByUser(req, res) {
    try {
      let where = {};

      const { idUser } = req.params;

      if (idUser) {
        where = {
          user_id: idUser,
          [Op.and]: { [Op.or]: [{ delivered: 0 }, { delivered: 2 }] },
        };
      }

      const data = await Order.findAll({
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
      const data = await Order.create(req.body);
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
      const data = await Order.findByPk(id, {
        Order: ['id'],
      });

      if (!data) {
        return res.status(400).json({
          errors: ['Pedido não existe.'],
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
      const data = await Order.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Pedido não existe.'],
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
      const data = await Order.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Pedido não existe.'],
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

export default new OrderController();
