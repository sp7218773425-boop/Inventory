const apiURL = "http://localhost:8080/api/sales";
const productURL = "http://localhost:8080/api/products";

const table = document.getElementById("saleTable");
const addBtn = document.getElementById("addSaleBtn");

async function loadProducts() {
  const res = await fetch(productURL);
  const products = await res.json();
  const sel = document.getElementById("productSelect");
  sel.innerHTML = '<option value="">Select Product</option>';
  products.forEach(p => {
    sel.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

async function loadSales() {
  const res = await fetch(apiURL);
  const data = await res.json();
  table.innerHTML = "";
  data.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.date}</td>
        <td>${s.client_name}</td>
        <td>${s.product_name}</td>
        <td>${s.quantity}</td>
        <td>${s.amount}</td>
      </tr>`;
  });
}

addBtn.addEventListener("click", async () => {
  const date = document.getElementById("date").value;
  const client_name = document.getElementById("clientName").value;
  const product_id = document.getElementById("productSelect").value;
  const quantity = document.getElementById("quantity").value;
  const amount = document.getElementById("amount").value;

  if (!product_id || !quantity || !amount) return alert("⚠️ Fill all fields!");

  const res = await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, client_name, product_id, quantity, amount })
  });

  const msg = await res.json();
  if (res.ok) {
    alert(msg.message);
    await loadSales();
  } else {
    alert(msg.error || "❌ Sale failed");
  }
});

loadProducts();
loadSales();
