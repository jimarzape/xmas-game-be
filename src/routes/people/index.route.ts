import * as express from "express";
import { celebrate } from "celebrate";
import peopleSchema from "../../constants/schema/people.schema";
import peopleController from "../../controllers/people.controller";

const router = express.Router();

router.post("/create", celebrate(peopleSchema.create), peopleController.create);

router.put(
  "/update/:id",
  celebrate(peopleSchema.update),
  peopleController.update
);

router.post("/list", peopleController.list);

router.delete("/delete/:id", peopleController.softDelete);

export default router;
