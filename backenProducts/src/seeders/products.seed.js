//le fichier ci permet d'insérer des donnés pas défauts

import products from "../data/products.js";
import { connectDB } from "../db/connect.js";
import { Product } from "../models/Product.js";
import 'dotenv/config';

export async function seedProducts() {
  try {
    await connectDB();
    products.forEach(async (product) => {
      await Product.create(product);
    });

    console.log("Produit insérer avec succès");
  } catch (error) {
    console.log(`Erreur lors du seed ${error.message}`);
  }
}

seedProducts();
