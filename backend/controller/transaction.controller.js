import db from "../config/db.config.js";

export const createTransaction = async (req, res) => {
  const transaction = req.body;

  try {

    const response = await db.query(
      "select * from cashbooks where id = $1 and user_id = $2",
      [transaction.cashbook_id, req.user.id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ message: `cashbook with id ${transaction.cashbook_id} does not exist }` });
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
    res.status(201).json({ message: "Cashbook created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
