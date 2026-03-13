import app from "./app.js";
import cors from "cors";
import { connectDB } from "./db/connect.js";
// import { products } from "./services/products.service.js";
// console.log(products);

const port = process.env.PORT ?? 3000;

app.use(cors());
await connectDB();

app.listen(port, () => {
  console.log(`L'application express a démarré sur le port ${port}`);
});
