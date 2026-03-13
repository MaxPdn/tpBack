import express from "express";
import routes from "./routes/index.js";
import loggerMiddleware from "./middlewares/middlewares/logger.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use(loggerMiddleware);
app.use("/api", routes);

export default app;
