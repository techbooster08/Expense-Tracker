import db from "../config/db.config.js";

export const createCashBook = async (req, res) => {
  const { name, description } = req.body;
  const user_id = req.user.id;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "name & description both fields are required" });
  }

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
      c.description, 
      c.is_favorited, 
      c.is_archived,
      c.created_at,
      c.updated_at,
      COALESCE(SUM(
          CASE 
              WHEN t.transaction_type = 'cash_in' THEN t.amount
              WHEN t.transaction_type = 'cash_out' THEN -t.amount
              ELSE 0
          END
      ), 0) AS balance,
      COUNT(t.id) AS total_transactions
      FROM cashbooks c
      LEFT JOIN transactions t ON t.cashbook_id = c.id
      WHERE c.user_id = $1
      GROUP BY c.id, c.name, c.description, c.is_favorited, c.is_archived
      ORDER BY c.name;`,
      [user_id]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "No cashbooks found" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateCashBook = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const user_id = req.user.id;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "name & description both fields are required" });
  }

  try {
    const response = await db.query(
      "select * from cashbooks where id = $1 and user_id = $2",
      [id, user_id]
    );
    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `cashbook with id ${id} does not exist` });
    }

    await db.query(
      "UPDATE cashbooks SET name = $1, description = $2 WHERE id = $3 AND user_id = $4",
      [name, description, id, user_id]
    );
    res.status(200).json({ message: "Cashbook updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

export const deleteCashBook = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const response = await db.query(
      "select * from cashbooks where id = $1 and user_id = $2",
      [id, user_id]
    );
    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `cashbook with id ${id} does not exist` });
    }

    await db.query("DELETE FROM cashbooks WHERE id = $1 AND user_id = $2", [
      id,
      user_id,
    ]);
    res.status(200).json({ message: "Cashbook deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};


export const toggleFavorite = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const response = await db.query(
      `select
      *
      from cashbooks
      where id = $1 and user_id = $2`,
      [id, user_id]
    );
    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `cashbook with id ${id} does not exist` });
    }
    await db.query(
      "UPDATE cashbooks SET is_favorited = NOT is_favorited WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    res.status(201).json({ message: "Cashbook updated SuccessFully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
}



export const toggleArchive = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const response = await db.query(
      `select
      *
      from cashbooks
      where id = $1 and user_id = $2`,
      [id, user_id]
    );
    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `cashbook with id ${id} does not exist` });
    }
    await db.query(
      "UPDATE cashbooks SET is_archived = NOT is_archived WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    res.status(201).json({ message: "Cashbook updated SuccessFully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
}