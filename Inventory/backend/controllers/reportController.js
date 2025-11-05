const db = require('../db');

exports.getSummary = async (req, res) => {
  try {
    // Total Purchases
    const [purchase] = await db.query("SELECT IFNULL(SUM(amount),0) AS total_purchase FROM purchases");

    // Total Sales
    const [sales] = await db.query("SELECT IFNULL(SUM(amount),0) AS total_sales FROM sales");

    // Total Stock Value
    const [stock] = await db.query("SELECT IFNULL(SUM(total_stock_value),0) AS total_stock_value FROM stock");

    const totalPurchase = purchase[0].total_purchase;
    const totalSales = sales[0].total_sales;
    const totalStockValue = stock[0].total_stock_value;

    const profit = totalSales - totalPurchase;

    res.json({
      totalPurchase,
      totalSales,
      totalStockValue,
      profit
    });
  } catch (err) {
    console.error("❌ getSummary error:", err);
    res.status(500).json({ error: err.message });
  }
};
