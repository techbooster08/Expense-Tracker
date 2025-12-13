import db from "../config/db.config.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const user = req.user;

  if (!name) {
    return res.status(400).json({ message: "name is required!" });
  }

  try {
    await db.query(
      `INSERT INTO categories(
      user_id, name)
      VALUES ($1, $2)`,
      [user.id, name]
    );
    res.status(201).json({ message: "Category created successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getUserCategories = async (req, res) => {
  const user = req.user;

  try {
   const response =  await db.query("select id, name from categories where user_id = $1 OR user_id is null", [user.id]);
    res.status(200).json({categories : response.rows,  message: "Categories fetched successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

