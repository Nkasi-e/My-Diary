const { Router } = require("express");
const { validateEntry } = require("../db/db");
const validatorMiddleware = require("../middleware/validatorMiddleware");

const {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
  deleteEntry,
} = require("../controller/user");

const router = Router();

router
  .route("/")
  .get(viewAllEntries)
  .post([validatorMiddleware(validateEntry)], postEntries);
router.route("/:id").get(viewSingleEntry).delete(deleteEntry);

module.exports = router;
