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

router.put("/set-won/:id", peopleController.setWon);

router.post("/set-excluded/:id", peopleController.setExclude);

router.post("/list", peopleController.list);

router.post("/raffle-list", peopleController.rafflelist);

router.delete("/delete/:id", peopleController.softDelete);

export default router;
