import express from "express";
import products_routes from "./routes/products.routes.js";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/products", products_routes);

export default app;
