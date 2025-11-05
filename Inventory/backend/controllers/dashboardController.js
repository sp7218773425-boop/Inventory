const db = require('../db');

exports.getSummary = async (req, res) => {
  try {
    const [[{ totalProducts }]] = await db.query('SELECT COUNT(*) AS totalProducts FROM products');
    const [[{ totalPurchases }]] = await db.query('SELECT IFNULL(SUM(amount),0) AS totalPurchases FROM purchases');
    const [[{ totalSales }]] = await db.query('SELECT IFNULL(SUM(amount),0) AS totalSales FROM sales');
    const [[{ totalStockValue }]] = await db.query('SELECT IFNULL(SUM(total_stock_value),0) AS totalStockValue FROM stock');

    const profit = totalSales - totalPurchases;

    res.json({ totalProducts, totalPurchases, totalSales, totalStockValue, profit });
  } catch (err) {
    console.error("❌ Dashboard summary error:", err);
    res.status(500).json({ error: err.message });
  }
};
