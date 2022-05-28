// must always have the loginRequired called before
export default async (req, res, next) => {
  if (req.adm !== 1 && req.adm !== 2) {
    return res.status(401).json({
      errors: ['Não autorizado'],
    });
  }

  return next();
};
