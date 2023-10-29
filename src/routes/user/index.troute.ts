import * as express from "express";

import userController from "../../controllers/user.controller";
import userSchema from "../../constants/schema/user.schema";

const router = express.Router();
import { celebrate } from "celebrate";

router.post("/create", celebrate(userSchema.register), userController.register);
router.post("/login", celebrate(userSchema.login), userController.login);
router.post(
  "/user/:id",
  celebrate(userSchema.update),
  userController.updateUser
);
router.get("/profile/:id", userController.viewProfile);
router.get("/me", userController.self);

export default router;

// module.exports = router
