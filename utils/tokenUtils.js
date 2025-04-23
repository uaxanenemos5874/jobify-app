import jwt from "jsonwebtoken";
const jwt_secret_key = process.env.JWT_SECRET_KEY || "jwtsecret12345";

export function createJWT(payload) {
  const token = jwt.sign(payload, jwt_secret_key, {
    expiresIn: process.env.JWT_EXPIRY_DURATION || "1d",
  });
  return token;
}

export function verifyJWT(token) {
  const decoded = jwt.verify(token, process.env.jwt_secret_key);
  return decoded;
}
