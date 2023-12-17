import * as express from "express";
import userAuth from "./user/index.route";
import categoryRoute from "./category/index.route";
import familyRoute from "./family/index.route";
import peopleRoute from "./people/index.route";
import gameRoute from "./game/index.route";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ZAPE API");
});

router.use("/user", userAuth);

router.use("/category", categoryRoute);

router.use("/family", familyRoute);

router.use("/people", peopleRoute);

router.use("/game", gameRoute);

router.use(express.static("public"));
router.use(express.static("files"));

const path = require("path");
router.use("/static", express.static(path.join(__dirname, "public")));

export default router;
// module.exports = router;
