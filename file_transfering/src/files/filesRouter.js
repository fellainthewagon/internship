const { Router } = require("express");
const upload = require("../middleware/upload");
const validateId = require("../middleware/validateId");
const filesController = require("./filesController");

const router = Router();

router.get("/", async (req, res, next) => {
  await filesController.getAll(req, res, next);
});

router.post("/", upload.single("file"), async (req, res, next) => {
  await filesController.create(req, res, next);
});

router.delete("/:id", validateId, async (req, res, next) => {
  await filesController.deleteOne(req, res, next);
});

router.delete("/", async (req, res, next) => {
  await filesController.deleteAll(req, res, next);
});

module.exports = router;
