const apiURL = "http://localhost:8080/api/dashboard";

async function loadDashboard() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    document.getElementById("totalProducts").innerText = data.totalProducts || 0;
    document.getElementById("totalPurchase").innerText = data.totalPurchases || 0;
    document.getElementById("totalSales").innerText = data.totalSales || 0;
    document.getElementById("totalStockValue").innerText = data.totalStockValue?.toFixed(2) || 0;
    document.getElementById("profit").innerText = data.profit?.toFixed(2) || 0;

    drawChart(data.totalPurchases, data.totalSales);
  } catch (err) {
    console.error("❌ Dashboard load error:", err);
  }
}

function drawChart(purchase, sales) {
  const ctx = document.getElementById("chart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Purchases", "Sales"],
      datasets: [{
        label: "Amount (₹)",
        data: [purchase, sales],
        backgroundColor: ["#007bff", "#28a745"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

loadDashboard();
