// src/services/articles.service.js
import { Product } from "../models/Product.js";
 
export async function createProduct(payload) { return Product.insertMany(payload) }
 
export async function listProducts({ page = 1, limit = 10, search, category }) {
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
   
    const filter = {};
 
    if (search) { filter.name = { $regex: search, $options: "i" } }
    if (category && category !== '') { filter.category = category }
 
    const [items, total] = await Promise.all([
        Product.find(filter)
            .sort({ createdAt: -1 })
            .skip((safePage - 1) * safeLimit)
            .limit(safeLimit),
        Product.countDocuments(filter)
    ]);
 
    return {
        items,
        meta: { page: safePage, limit: safeLimit, total }
    };
}
 
export async function getProductById(id) { return Product.findById(id) }
 
export async function updateProductById(id, payload) {
    return Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
}
 
export async function deleteProductById(id) { return Product.findByIdAndDelete(id) }
 