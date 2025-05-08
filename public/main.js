document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (!form) {
    console.error('No se encontró el formulario con id="form"');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const formData = new FormData(event.target);
    const productData = {};
  
    formData.forEach((value, key) => {
      productData[key] = value;
    });
  
    console.log('Datos del formulario:', productData);
  
    if (productData.thumbnails && productData.thumbnails.indexOf(',') !== -1) {
      productData.thumbnails = productData.thumbnails.split(',');
    } else {
      productData.thumbnails = [productData.thumbnails];
    }
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        const newProduct = await response.json();
        // alert('Producto agregado correctamente');
        console.log(newProduct);
      } else {
        const error = await response.json();
        console.log('Error al agregar el producto: ' + error.error);
      }
    } catch (error) {
      alert('Hubo un error al intentar agregar el producto');
      console.error(error);
    }

    
    socket.emit("new-product", product)
    form.reset()
  });
});


const socket = io();

socket.on('message', (data) => {
  console.log("mensaje del servidor:" + data)
});