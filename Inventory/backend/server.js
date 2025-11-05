const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// 🔗 Database Connection
const con = require('./db');

// ✅ Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/stock', require('./routes/stockRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));

// ✅ Add this line for Dashboard
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// 🚀 Server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
