
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import productManager from "./src/managers/productManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ProductManager = new productManager(resolve(__dirname, "src", "data", "products.json"));



console.log("archivo cargado");

export default function websocket(io) {
  io.on("connection", (socket) => {
    console.log("Id del cliente " + socket.id);

 
   const sendProducts = async () => {
    const products = await ProductManager.getProducts();
  io.emit("update-products", products)
  console.log("Se emitió update-products con", products.length, "productos");

   }
   
   sendProducts();

   socket.on("new-product", async (data) =>{
    const{
      title = "",
      description= "",
      code = "",
      price= 0,
      stock = 0,
      category="",
      thumbnails = [],
      status="",
    } = data 
   
     ProductManager.addProduct(
      title,
      description,
      code,
      Number(price),
      Number(stock),
      category,
      thumbnails,
      status,
     );

     sendProducts();

    });

    socket.on("delete-product", async (productId)=> {
      const id = parseInt(productId)
      await ProductManager.deleteProduct(id);

      const updateProducts = await productManager.getProducts()
      io.emit("update-products", updateProducts)
      
      
    }) 
  })};




// io en el servidor - representa el servidor de websocket, 
//puede enviar cosas a todos los clientes conectados


//io en el cliente/navegador -representa el cliente de websocket
//se pueden enviar y recibir mensajes y eventos


//socket en el servidor - representa a un cliente conectado
//se unsa para enviar/escuchar mensajes solo a ese cliente


//socket en el cliente/navegador - representa al servidor de websocket
//se usa para enviar/escuchar mensajes solo a ese servidor