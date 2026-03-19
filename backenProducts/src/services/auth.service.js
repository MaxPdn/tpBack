import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export async function registerUser({ name, email, password }) {
  if (typeof name !== "string" || name.trim().length < 2) {
    const err = new Error("name must be at least 2 characters");
    err.statusCode = 400;
    throw err;
  }

  if (typeof email !== "string" || !email.includes("@")) {
    const err = new Error("email is invalid");
    err.statusCode = 400;
    throw err;
  }

  if (typeof password !== "string" || password.length < 6) {
    const err = new Error("password must be at least 6 characters");
    err.statusCode = 400;
    throw err;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    const err = new Error("email already in use");
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  });

  return user;
}

export async function loginUser({  email, password }) {
  if (typeof email !== "string" || typeof password !== "string") {
    const err = new Error("email and password are required");
    err.statusCode = 400;
    throw err;
  }
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select(
    "+passwordHash",
  );

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  //JWT payload minimal (éviter d'y mettre trop de données)
  const token = jwt.sign(
    { sub: String(user._id), role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  //on renvoie un user 'public' (sans passwordHash)
  //Note:user contient passwordHash 
  return {
    token,
    user:user.toJSON()
  }
}
