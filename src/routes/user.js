const { Router } = require("express");

const {
  viewAllEntries,
  postEntries,
  viewSingleEntry,
} = require("../controller/user");

const router = Router();

router.route("/").get(viewAllEntries).post(postEntries);
router.route("/:id").get(viewSingleEntry);

module.exports = router;
