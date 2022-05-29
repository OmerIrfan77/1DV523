import express from "express";
import controller from "../controller/controller.js";
const router = express.Router();

/* GET home page. */
router.get("/", controller.index);
router.post("/", controller.test);
// router.post("/", controller.webhookPost, () => {
//   console.log("Hello There");
// });
console.log("INSIDE router.js");

export default router;
