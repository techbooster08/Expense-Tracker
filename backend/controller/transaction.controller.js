import db from "../config/db.config.js";

export const createTransaction = async (req, res) => {
  const transaction = req.body;

  try {
    const response = await db.query(
      "UPDATE cashbooks SET updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *",
      [transaction.cashbook_id, req.user.id]
    );

    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({
          message: `cashbook with id ${transaction.cashbook_id} does not exist }`,
        });
    }

    await db.query(
      `INSERT INTO public.transactions(
      cashbook_id, category_id, amount, transaction_type, description, payment_mode, transaction_datetime)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        transaction.cashbook_id,
        transaction.category_id,
        transaction.amount,
        transaction.transaction_type,
        transaction.description,
        transaction.payment_mode,
        transaction.transaction_datetime,
      ]
    );
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactionsByCashbookId = async (req, res) => {
  const user_id = req.user.id;
  const { cashbookId } = req.params;
  try {
    const validation = await db.query(
      "select * from cashbooks where id = $1 and user_id = $2",
      [cashbookId, user_id]
    );

    if (validation.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `cashbook with id ${cashbookId} does not exist }` });
    }

    const response = await db.query(
      `SELECT 
      t.id, 
      t.cashbook_id, 
      t.category_id, 
      t.amount, 
      t.transaction_type, 
      t.description, 
      t.payment_mode, 
      t.transaction_datetime,
      c.name AS category_name,
      SUM(CASE WHEN t.transaction_type = 'cash_in' THEN t.amount ELSE -t.amount END) OVER (ORDER BY t.transaction_datetime ASC, t.id ASC) AS balance
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.cashbook_id = $1
      ORDER BY t.transaction_datetime DESC, t.id DESC;`,
      [cashbookId]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.query(
      "select * from transactions where id = $1",
      [id]
    );
    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ message: `transaction with id ${id} does not exist` });
    }

    await db.query("DELETE FROM transactions WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
