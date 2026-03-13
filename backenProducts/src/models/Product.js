import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire"],
      trim: true,
    },
    price: {
      type: Number,
      riquired: [true, "Le pris du procuit est obligatoire"],
      min: [1, "Le prix du produit doit être supérieur à 0"],
    },
    category: {
      type: String,
      required: [true, "Vous devez definir la catégorie du produit"],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
