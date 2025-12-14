import db from "../config/db.config.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    
    // check is user is already exist in database
    const checkuser = await db.query(
      "select email from users where email = $1",
      [email]
    );

    if (checkuser.rows.length > 0) {
      // send response if user already exist
      res.status(400).json({ message: "user already exist!" });
    } else {
      // create a hashed password
      const hashPassword = await bcryptjs.hash(password.toString(), 10);

      // Insert new-user to database
      await db.query(
        "INSERT INTO users (full_name, email, password_hash) VALUES($1, $2, $3) ",
        [full_name, email, hashPassword]
      );
      // send response after successfull user registration
      res.status(201).json({ message: "User registered Successfully!" });
    }
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = await req.body;

    // check user is exist in database
    const checkuser = await db.query(
      "select email from users where email = $1",
      [email]
    );

    if (checkuser.rows.length > 0) {
      // get user info from databasse if exist
      const response = await db.query(
        "SELECT id, full_name, email, password_hash FROM users WHERE email = $1",
        [email]
      );
      const user = response.rows[0];
      // compare Password with hash
      const isMatch = await bcryptjs.compare(password, user.password_hash);

      if (isMatch === true) {
        // send response if pasword is corect

        // Generate JWT Token
        const token = await createToken({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
          });

        res.status(200).json({
          message: "Login successful",
          token: token,
        });
      } else {
        // send response if user entered wrong password
        res.status(400).json({ message: "incorrect password" });
      }
    } else {
      // send res if user dont exist in database
      res.status(400).json({ message: "User don't exist " });
    }
  } catch (error) {
    // send res if any error occured in server
    console.log("error : ", error);
    res.status(500).json("Internal server error");
  }
};

