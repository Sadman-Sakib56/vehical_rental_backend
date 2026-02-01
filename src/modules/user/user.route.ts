import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), userController.getAllUsers);
router.get("/:id", auth("admin"), userController.getSingleUser);
router.put("/:id", auth("admin", "customer"), userController.updateUser);
router.delete("/:id", auth("admin"), userController.deleteUser);

export default router;
