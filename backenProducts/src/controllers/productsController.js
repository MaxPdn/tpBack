import mongoose from "mongoose";
import { createProduct, listProducts, getProductById, updateProductById, deleteProductById } from "../services/products.service.js";
 
function isValidObjectId(id) { return mongoose.Types.ObjectId.isValid(id) }
 
export async function create(req, res, next) {
    try {
        const product = await createProduct(req.body);
        return res.status(201).json({ data: product });
    } catch (err) {
        return next(err);
    }
}
 
export async function list(req, res, next) {
    try {
        const { page, limit, search, category } = req.query;
        const result = await listProducts({ page, limit, search, category });
        return res.status(200).json({ data: result.items, meta: result.meta });
    } catch (err) {
        return next(err);
    }
}
 
export async function getOne(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ error: { message: "Invalid id" } })
        const product = await getProductById(id);
        if (!product) return res.status(404).json({ error: { message: "Product not found" } });
        return res.status(200).json({ data: product });
    } catch (err) {
        return next(err);
    }
}
 
export async function update(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id))  return res.status(400).json({ error: { message: "Invalid id" } })
        const product = await updateProductById(id, req.body);
        if (!product) return res.status(404).json({ error: { message: "Product not found" } });
        return res.status(200).json({ data: product });
    } catch (err) {
        return next(err);
    }
}
 
export async function remove(req, res, next) {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id))  return res.status(400).json({ error: { message: "Invalid id" } })
        const deleted = await deleteProductById(id);
        if (!deleted) return res.status(404).json({ error: { message: "Product not found" } });
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
}
 
 