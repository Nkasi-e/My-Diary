const { Router } = require("express");

const { viewAllEntries, postEntries } = require("../controller/user");

const router = Router();

router.route("/").get(viewAllEntries).post(postEntries);

module.exports = router;
