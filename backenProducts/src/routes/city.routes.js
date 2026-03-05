import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import checkIdMiddleware from "../middlewares/middlewares/checkId.middleware.js";
const router = Router();

//GET /users (Pagination)
router.get("/", userController.getAllUsers);

//GET /users/:id
router.get("/:id", checkIdMiddleware, userController.getUserId);

//Filtrage par ville
router.get("/city/:city", userController.filtrageVille);

//Filtrage par username
router.get("/username/:username", userController.getFiltrageUserName);

//Double filtrage
router.get("/filter/:city/:username", userController.getDoubleFiltrage);

//POST /users
router.post("/", userController.postUsers);

//PUT /users/:id
router.put("/:id", checkIdMiddleware, userController.putUsersId);

//DELETE /users/:id
router.delete("/:id", checkIdMiddleware, userController.deleteUser);

//DELETE /users/range/:min/:max
router.delete("/range/:min/:max", userController.deleteUserRang);

export default router;
