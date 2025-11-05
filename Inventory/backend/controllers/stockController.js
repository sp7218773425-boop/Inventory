const db = require('../db');

// Get all stock with product details
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.product_id, s.product_name, 
             s.total_quantity, s.total_stock_value,
             p.price
      FROM stock s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.id
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ getAll stock:", err);
    res.status(500).json({ error: err.message });
  }
};
