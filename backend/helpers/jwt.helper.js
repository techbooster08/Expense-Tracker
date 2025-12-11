import jwt from "jsonwebtoken";

export const createToken = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};

export const decodeToken = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
}
