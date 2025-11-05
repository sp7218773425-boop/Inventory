const apiURL = "http://localhost:8080/api/report";

async function loadReport() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    document.getElementById("purchaseTotal").textContent = `₹${data.totalPurchase.toFixed(2)}`;
    document.getElementById("salesTotal").textContent = `₹${data.totalSales.toFixed(2)}`;
    document.getElementById("stockValue").textContent = `₹${data.totalStockValue.toFixed(2)}`;

    const profitElem = document.getElementById("profit");
    const profit = data.profit.toFixed(2);
    profitElem.textContent = `₹${profit}`;
    profitElem.style.color = profit >= 0 ? "limegreen" : "red";

  } catch (err) {
    console.error("Error loading report:", err);
  }
}

loadReport();
