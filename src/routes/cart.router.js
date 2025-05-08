import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

//get por id
router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404);
    res.json({ error: "Cart not found" });
  }
});

//agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404);
    res.json({ error: "Cart or Product Not Found" });
  }
});

export default router;
