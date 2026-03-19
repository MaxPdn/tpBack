import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body ?? {});
    return res.status(201).json({ data: user });
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body ?? {});
    return res.status(200).json({ data: result });
  } catch (err) {
    return next(err);
  }
}