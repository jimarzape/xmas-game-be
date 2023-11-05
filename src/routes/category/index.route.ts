import * as express from "express";
import { celebrate } from "celebrate";
import categorySchema from "../../constants/schema/category.schema";
import categoryController from "../../controllers/category.controller";

const router = express.Router();

router.post(
  "/create",
  celebrate(categorySchema.create),
  categoryController.create
);

router.put(
  "/update/:id",
  celebrate(categorySchema.update),
  categoryController.update
);

router.post("/list", categoryController.list);

router.delete("/delete/:id", categoryController.softDelete);

export default router;
