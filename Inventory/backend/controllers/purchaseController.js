const db = require('../db');

// Get all purchases
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.date, p.client_name, pr.name AS product_name,
             p.quantity, p.amount
      FROM purchases p
      JOIN products pr ON p.product_id = pr.id
      ORDER BY p.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getAll purchases:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add a new purchase (+stock)
exports.create = async (req, res) => {
  try {
    const { date, client_name, product_id, quantity, amount } = req.body;

    // Insert purchase
    await db.query(
      'INSERT INTO purchases (date, client_name, product_id, quantity, amount) VALUES (?, ?, ?, ?, ?)',
      [date || new Date(), client_name, product_id, quantity, amount]
    );

    // Update stock
    await db.query(
      `UPDATE stock 
       SET total_quantity = total_quantity + ?, 
           total_stock_value = total_stock_value + ?
       WHERE product_id = ?`,
      [quantity, amount, product_id]
    );

    res.json({ message: "✅ Purchase added successfully!" });
  } catch (err) {
    console.error("❌ create purchase:", err);
    res.status(500).json({ error: err.message });
  }
};
