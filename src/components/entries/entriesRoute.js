const { Router } = require("express");
const { validateEntry } = require("../middleware/validation");
const validatorMiddleware = require("../middleware/validatorMiddleware");

const {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
  deleteEntry,
  modifyEntry,
} = require("./entriesController");

const router = Router();

router
  .route("/")
  .get(viewAllEntries)
  .post([validatorMiddleware(validateEntry)], postEntries);
router
  .route("/:id")
  .get(viewSingleEntry)
  .delete(deleteEntry)
  .patch(modifyEntry);

module.exports = router;
