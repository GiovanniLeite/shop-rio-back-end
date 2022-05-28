import Address from '../models/Address';

class AddressController {
  async index(req, res) {
    try {
      const data = await Address.findAll();
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const data = await Address.create(req.body);
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
      const data = await Address.findByPk(id, {
        order: ['id'],
      });

      if (!data) {
        return res.status(400).json({
          errors: ['Endereço não existe.'],
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
      const data = await Address.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Endereço não existe.'],
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
      const data = await Address.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Endereço não existe.'],
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

export default new AddressController();
