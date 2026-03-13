import { Router } from "express";

import {
  list,
  create,
  update,
  remove,
  getOne,
} from "../controllers/productsController.js";

const router = Router();

router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/:id", getOne);

export default router;
