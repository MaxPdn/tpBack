const checkIdMiddleware = (req, res, next) => {
  
  console.log(req.params);
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Id invalid" });
  }

  next();
};

export default checkIdMiddleware;
