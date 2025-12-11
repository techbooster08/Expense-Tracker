import db from "../config/db.config.js";

export const createCashBook = async (req, res) => {
  const { name, description } = req.body;
  const user_id = req.user.id;
  try {
    await db.query(
      "INSERT INTO cashbooks (name, description, user_id) VALUES ($1, $2, $3)",
      [name, description, user_id]
    );
    res.status(201).json({ message: "Cashbook created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCashAllBooks = async (req, res) => {
  const user_id = req.user.id;
  try {
    const response = await db.query(
      `SELECT 
      c.id, 
      c.name, 
      c.is_favorited, 
      c.is_archived,
      COALESCE(SUM(t.amount), 0) AS balance, 
      COUNT(t.id) AS total_transactions
    FROM cashbooks c
    LEFT JOIN transactions t ON t.cashbook_id = c.id
    WHERE c.user_id = $1
    GROUP BY c.id, c.name, c.is_favorited, c.is_archived
    ORDER BY c.name`,
      [user_id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
