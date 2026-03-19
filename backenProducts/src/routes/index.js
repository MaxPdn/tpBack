import { Router } from "express";
import articlesRouter from "../routes/products.routes.js";
import authRouter from "../routes/auth.routes.js";
import meRouter from "../routes/me.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ data: { status: "ok" } }));

router.use("/auth", authRouter);
router.use("/me", meRouter);
router.use("/articles", articlesRouter);

export default router;
