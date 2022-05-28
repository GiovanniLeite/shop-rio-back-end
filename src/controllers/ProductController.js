import { Op } from 'sequelize';
import Product from '../models/Product';
import Picture from '../models/Picture';

class ProductController {
  async index(req, res) {
    try {
      let where = {};

      const { name } = req.params;
      const { idCategory } = req.params;

      if (name) {
        where = {
          name: { [Op.like]: `%${name}%` },
        };
      } else if (idCategory) {
        where = {
          category_id: idCategory,
        };
      }

      const data = await Product.findAll({
        order: [
          ['id', 'DESC'],
          [Picture, 'id', 'DESC'],
        ],
        include: {
          model: Picture,
          attributes: ['id', 'url', 'file_name'],
        },
        where,
      });

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
      const data = await Product.findByPk(id, {
        order: [
          ['id', 'DESC'],
          [Picture, 'id', 'DESC'],
        ],
        include: {
          model: Picture,
          attributes: ['id', 'url', 'file_name'],
        },
      });

      // if (!data) {
      //   return res.status(400).json({
      //     errors: ['Produto não existe.'],
      //   });
      // }

      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const data = await Product.create(req.body);
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
      const data = await Product.findByPk(id);
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
      const data = await Product.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Produto não existe.'],
        });
      }

      if (req.adm === 1 || req.adm === 2) {
        const dataAtt = await data.update(req.body);
        return res.json(dataAtt);
      } else {
        const dataAtt = await data.update({
          quantity: req.body.quantity,
        });
        return res.json(dataAtt);
      }
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProductController();
