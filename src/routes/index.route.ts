import * as express from "express";
import userAuth from "./user/index.troute";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ZAPE API");
});

router.use("/user", userAuth);

router.use(express.static("public"));
router.use(express.static("files"));

const path = require("path");
router.use("/static", express.static(path.join(__dirname, "public")));

export default router;
// module.exports = router;
