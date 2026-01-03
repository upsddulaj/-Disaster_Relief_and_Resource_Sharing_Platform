export const validateRequest = (schema) => (req, res, next) => {
  const options = { abortEarly: false, stripUnknown: true };
  const { error, value } = schema.validate({
    body: req.body,
    params: req.params,
    query: req.query
  }, options);

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message)
    });
  }

  req.validated = value;
  next();
};
