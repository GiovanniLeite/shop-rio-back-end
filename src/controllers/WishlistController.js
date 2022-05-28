import Wishlist from '../models/Wishlist';

class WishlistController {
  async index(req, res) {
    try {
      let where = {};

      const { idUser } = req.params;
      if (idUser) {
        where = {
          user_id: idUser,
        };
      }
      const data = await Wishlist.findAll({
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
      const data = await Wishlist.create(req.body);
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
      const data = await Wishlist.findByPk(id, {
        order: ['id'],
      });

      if (!data) {
        return res.status(400).json({
          errors: ['Desejo não existe.'],
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
      const data = await Wishlist.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Desejo não existe.'],
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
      const data = await Wishlist.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Desejo não existe.'],
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

export default new WishlistController();
