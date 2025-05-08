document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const productContainer = document.getElementById("productContainer");
  const socket = io();

  if (!form) {
    console.error('No se encontró el formulario con id="form"');
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = {
      title: form.title.value,
      description: form.description.value,
      code: form.code.value,
      price: form.price.value,
      status: form.status.checked ? "on" : "off",
      stock: form.stock.value,
      category: form.category.value,
      thumbnails: [form.thumbnails.value],
    };

    console.log("evento submit escuchado, const products working");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Producto guardado en archivo");

        form.reset();
      } else {
        const error = await response.json();
        console.error("Error al guardar el producto:", error.error);
      }
    } catch (error) {
      console.error("Error al hacer POST del producto", error);
    }
  });

  socket.on("update-products", (products) => {
    console.log("RECIBIDOS", products.length, "PRODUCTOS");

    const html = products
      .map(
        (product) => `
      <div class="product-card" style="margin-bottom: 50px;">
        <hr>
        ${
          product.thumbnails && product.thumbnails.length
            ? `<img src="${product.thumbnails[0]}" alt="Product Image" width="100" height="100">`
            : `<p>NO IMAGE</p>`
        }
        <p>${product.title}</p>
        <p>${product.price}</p>
        <p>${product.description}</p>
        <button class="delete-btn" data-id="${product.id}">Delete Item</button>
        <hr>
      </div>
    `
      )
      .join("");

    productContainer.innerHTML = `
      <h2>Lista de productos</h2>
      ${html}
    `;
    
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        console.log("Eliminando producto con ID:", productId);
        socket.emit("delete-product", productId);
      });
    });
  });
});
