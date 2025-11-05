const db = require('../db');


exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error("❌ getAll error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(rows[0] || null);
  } catch (err) {
    console.error("❌ getById error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    
    const [result] = await db.query(
      'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
      [name, description || '', price || 0]
    );

    const productId = result.insertId;

    
    await db.query(
      `INSERT INTO stock (product_id, product_name, qty, total_stock_value)
       VALUES (?, ?, 0, 0)
       ON DUPLICATE KEY UPDATE product_name = VALUES(product_name)`,
      [productId, name]
    );

    console.log("✅ Stock entry created for:", productId, name);

    
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ create error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    await db.query('UPDATE products SET name=?, description=?, price=? WHERE id=?', [name, description || '', price || 0, req.params.id]);
    await db.query('UPDATE stock SET product_name=? WHERE product_id=?', [name, req.params.id]);
    res.json({ message: 'updated' });
  } catch (err) {
    console.error("❌ update error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    await db.query('DELETE FROM stock WHERE product_id = ?', [req.params.id]);
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error("❌ delete error:", err);
    res.status(500).json({ error: err.message });
  }
};
