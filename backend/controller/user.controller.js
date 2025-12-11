import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const token  = req.headers.authorization.split(" ")[1];
     
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Decode JWT
    res.status(200).json({
      user: {
        id: decoded.id,
        full_name: decoded.full_name,
        email: decoded.email,
      },
      message: "User is Authorized! | Session is Active!",
    }); // Send decoded user info to frontend
  } catch (error) {
    res.status(401).json({ message: "Invalid token! | Session Expired!" });
  }
};
