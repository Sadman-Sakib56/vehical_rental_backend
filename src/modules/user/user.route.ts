import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), userController.getAllUsers);
router.get("/:userId", auth("admin"), userController.getSingleUser);
router.put("/:userId", auth("admin", "customer"), userController.updateUser);
router.delete("/:userId", auth("admin"), userController.deleteUser);

export default router;
