import express from "express";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/cart.router.js";
import handlebars from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import viewRouter from "./src/routes/view.router.js";
import websocket from "./websocket.js";


const app = express();
const PORT = 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Necesitás esto para poder usar __dirname con ESModules


//middleware
app.use(express.json()); //configuracion de express para poder usar json y urlencoded
app.use(express.urlencoded({ extended: true }));


//configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "handlebars");

app.use(express.static("public")); //para psoder usar archivos estaticos como css, js, img, etc
//fin de configuracion de handlebars


//rutas
app.use("/api/products", productsRouter); // /api/products
app.use("/api/carts", cartsRouter); ///api/carts
app.use("/", viewRouter) // "/" home y "/realtimeproducts" para realtimeproducts


websocket(io) //llamamos a la funcion websocket y le pasamos el io como parametro

httpServer.listen(PORT, () => {
  console.log(`Server working on port | http://localhost:${PORT} `);
});



















//immports de multer
//  import multer from "multer";
//  import path from "path";
// import __dirname from "path";;
//fin de multer imports

//multer
// let imageCounter = 1; // Counter to keep track of image numbers
// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `img${imageCounter++}${path.extname(file.originalname)}`);
//   },
// });
//  const upload = multer({ storage: storageConfig });
//  app.post("/upload", upload.single("archivo"), (req, res) => {
//    res.send("Archivo subido correctamente");
//  });
// //fin de multer
