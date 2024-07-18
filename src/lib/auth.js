import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.SECRET_KEY;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
