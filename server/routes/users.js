import express from "express";
import { getUser, deleteUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
