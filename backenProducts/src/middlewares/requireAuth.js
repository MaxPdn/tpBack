import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev_secret_change_me";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  console.log(req);

  if (!header) {
    return res.status(401).json({
      error: {
        message: "Missing Authorization header",
      },
    });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: { message: "Invalid Authorization format" } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //convention :sub=usesrId(defini au login)

    req.auth = {
      userId: payload.sub,
      role: payload.role,
      email: payload.email,
    };

    return next();
  } catch (error) {
    //jsonwebtoken lève:TokenExpiredError,JsonWebTokenError,NotBeforError
    return res
      .status(401)
      .json({ error: { message: "Invalid or expired token" } });
  }
}
