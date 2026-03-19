import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/requireRole.js";
import {
  list,
  create,
  update,
  remove,
  getOne,
} from "../controllers/products.controller.js";

const router = Router();

//routes publics
router.get("/", list);
router.get("/:id", getOne);

//protected
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

//exemple :/api/admin/status
router.get("/admin/stats", requireAuth, requireRole("admin"), (req, res) => {
  res.json({ data: { message: "Admin stats" } });
});
export default router;
