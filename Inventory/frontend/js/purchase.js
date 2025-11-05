const apiURL = "http://localhost:8080/api/purchases";
const productURL = "http://localhost:8080/api/products";

const table = document.getElementById("purchaseTable");
const addBtn = document.getElementById("addPurchaseBtn");

async function loadProducts() {
  const res = await fetch(productURL);
  const products = await res.json();
  const sel = document.getElementById("productSelect");
  sel.innerHTML = '<option value="">Select Product</option>';
  products.forEach(p => {
    sel.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}

async function loadPurchases() {
  const res = await fetch(apiURL);
  const data = await res.json();
  table.innerHTML = "";
  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.date}</td>
        <td>${p.client_name}</td>
        <td>${p.product_name}</td>
        <td>${p.quantity}</td>
        <td>${p.amount}</td>
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
  alert(msg.message);
  await loadPurchases();
});

loadProducts();
loadPurchases();
