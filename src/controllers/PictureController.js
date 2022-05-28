import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Picture from '../models/Picture';

const upload = multer(multerConfig).single('picture');

class PictureController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { product_id } = req.body;
        const picture = await Picture.create({
          original_name: originalname,
          file_name: filename,
          product_id,
        });

        return res.json(picture);
      } catch (e) {
        return res.status(400).json({
          errors: ['Imagem não existe'],
        });
      }
    });
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Picture.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Imagem não existe.'],
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
}

export default new PictureController();
