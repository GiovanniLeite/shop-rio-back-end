import Category from '../models/Category';
import { Op } from 'sequelize';

class CategoryController {
  async index(req, res) {
    try {
      let where = {};

      const { name } = req.params;

      if (name) {
        where = {
          name: { [Op.like]: `%${name}%` },
        };
      }
      const data = await Category.findAll({
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const newCategory = await Category.create(req.body);
      return res.json(newCategory);
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
      const category = await Category.findByPk(id, {
        order: ['id'],
      });

      return res.json(category);
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
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Categoria não existe.'],
        });
      }
      await category.destroy();

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
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Categoria não existe.'],
        });
      }

      const categoryAtt = await category.update(req.body);

      return res.json(categoryAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CategoryController();
