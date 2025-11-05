const apiURL = "http://localhost:8080/api/stock";
const table = document.getElementById("stockTable");

async function loadStock() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    table.innerHTML = "";

    if (!data.length) {
      table.innerHTML = `<tr><td colspan="5" class="text-center">No stock data available.</td></tr>`;
      return;
    }

    data.forEach(s => {
      table.innerHTML += `
        <tr>
          <td>${s.id}</td>
          <td>${s.product_name}</td>
          <td>${s.price}</td>
          <td>${s.total_quantity}</td>
          <td>${s.total_stock_value.toFixed(2)}</td>
        </tr>`;
    });
  } catch (err) {
    console.error("Error loading stock:", err);
  }
}

loadStock();
