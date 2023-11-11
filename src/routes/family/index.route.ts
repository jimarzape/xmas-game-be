import * as express from "express";
import { celebrate } from "celebrate";
import familySchema from "../../constants/schema/family.schema";
import familyController from "../../controllers/family.controller";

const router = express.Router();

router.post("/create", celebrate(familySchema.create), familyController.create);

router.put(
  "/update/:id",
  celebrate(familySchema.update),
  familyController.update
);

router.post("/list", familyController.list);

router.delete("/delete/:id", familyController.softDelete);

export default router;
