const apiURL = "http://localhost:8080/api/products";

const nameInput = document.getElementById("productName");
const descInput = document.getElementById("productDesc");
const priceInput = document.getElementById("productPrice");
const addBtn = document.getElementById("addProductBtn");
const tableBody = document.querySelector("#productTable tbody");

let editMode = false;
let editId = null;


async function loadProducts() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    tableBody.innerHTML = "";

    data.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.description}</td>
        <td>${p.price}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="editProduct(${p.id}, '${p.name}', '${p.description}', ${p.price})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
        </td>`;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

addBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const desc = descInput.value.trim();
  const price = parseFloat(priceInput.value.trim());

  if (!name || !desc || isNaN(price)) {
    alert("⚠️ Please fill all fields correctly!");
    return;
  }

  try {
    if (editMode) {
      
      const res = await fetch(`${apiURL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc, price })
      });

      if (res.ok) {
        alert("✅ Product updated successfully!");
        addBtn.textContent = "Add Product";
        editMode = false;
        editId = null;
      } else {
        alert("❌ Failed to update product.");
      }
    } else {
      
      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc, price })
      });

      
    }

    nameInput.value = "";
    descInput.value = "";
    priceInput.value = "";
    await loadProducts();
  } catch (err) {
    console.error("Error saving product:", err);
  }
});

function editProduct(id, name, desc, price) {
  nameInput.value = name;
  descInput.value = desc;
  priceInput.value = price;
  editMode = true;
  editId = id;
  addBtn.textContent = "Update Product";
}

async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  try {
    const res = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("🗑️ Product deleted!");
      await loadProducts();
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  }
}

loadProducts();
