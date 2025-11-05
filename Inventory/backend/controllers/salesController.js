const db = require('../db');

// Get all sales
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.date, s.client_name, p.name AS product_name,
             s.quantity, s.amount
      FROM sales s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getAll sales:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add a sale (–stock)
exports.create = async (req, res) => {
  try {
    const { date, client_name, product_id, quantity, amount } = req.body;

    // Check stock availability first
    const [stockRows] = await db.query(
      "SELECT total_quantity FROM stock WHERE product_id = ?",
      [product_id]
    );
    if (!stockRows.length) return res.status(400).json({ error: "Product not found in stock!" });

    const currentQty = stockRows[0].total_quantity;
    if (currentQty < quantity)
      return res.status(400).json({ error: "❌ Not enough stock available!" });

    // Insert sale
    await db.query(
      "INSERT INTO sales (date, client_name, product_id, quantity, amount) VALUES (?, ?, ?, ?, ?)",
      [date || new Date(), client_name, product_id, quantity, amount]
    );

    // Reduce stock
    await db.query(
      `UPDATE stock
       SET total_quantity = total_quantity - ?,
           total_stock_value = total_stock_value - ?
       WHERE product_id = ?`,
      [quantity, amount, product_id]
    );

    res.json({ message: "✅ Sale recorded successfully!" });
  } catch (err) {
    console.error("❌ create sale:", err);
    res.status(500).json({ error: err.message });
  }
};
