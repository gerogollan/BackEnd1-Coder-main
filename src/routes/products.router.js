import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");


//API
// Obtener todos los productos
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductByID(pid);
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// Agregar nuevo producto
router.post("/", async (req, res) => {
  const newProduct = await productManager.addProduct(
    req.body.title,
    req.body.description,
    req.body.code,
    req.body.price,
    req.body.status,
    req.body.stock,
    req.body.category,
    req.body.thumbnails
  );
  if (!newProduct)
    return res
      .status(400)
      .json({
        error:
          "Missing fields, Invalid fields entry or product already in existence",
      });
  res.status(201).json(newProduct);
});

// Actualizar producto por ID
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updated = await productManager.updateProduct(pid, req.body);
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
});

// Eliminar producto por ID
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const deleted = await productManager.deleteProduct(pid);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product deleted correctly", deleted });
});

//Para el 404
router.use((req, res) => {
  res.status(404).send("Error 404, Page not found, try to go back!!");
});
//FIN API


export default router;
