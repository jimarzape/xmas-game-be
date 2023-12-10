import * as express from "express";
import { celebrate } from "celebrate";
import gameSchema from "../../constants/schema/game.schema";
import gameController from "../../controllers/game.controller";

const router = express.Router();

router.post("/create", celebrate(gameSchema.create), gameController.create);

router.put("/update/:id", celebrate(gameSchema.update), gameController.update);

router.get("/:id", gameController.view);

router.delete("/:id", gameController.softDel);

router.post("/list", gameController.list);
