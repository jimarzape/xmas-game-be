import * as express from "express";
import { celebrate } from "celebrate";
import gameSchema from "../../constants/schema/game.schema";
import gameController from "../../controllers/game.controller";
const path = require("path");

const router = express.Router();

router.post("/upload", gameController.upload);

router.get("/files", express.static(path.join(__dirname, "files")));

router.post("/create", celebrate(gameSchema.create), gameController.create);

router.put("/update/:id", celebrate(gameSchema.update), gameController.update);

router.get("/view/:id", gameController.view);

router.delete("/delete/:id", gameController.softDel);

router.post("/list", gameController.list);

export default router;
