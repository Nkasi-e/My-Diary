const express = require("express");

const { getEntries, postEntries } = require("../controller/user");

const router = express.Router();

router.route("/").get(getEntries).post(postEntries);

module.exports = router;
