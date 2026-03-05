import { Router } from "express";
import products from "../data/products.js";
import { productsController } from "../controllers/product.controller.js";
const router=Router()


//recherche
router.get("/",productsController.getProducts);

//add
router.post("/",productsController.createProduct);

//delete
router.delete("/:id", (req, res) => {
 
    res.json({ msg: "User supprimé avec succès" });
});

//modification
router.put("/:id", (req, res) => {

    res.json({ msg: "User modifié avec succès" });
});

router.get("/stats", (req, res) => {
  let nombre_total = data.length;
  console.log(nombre_total);
  res.json({ number: nombre_total });
});

export default router