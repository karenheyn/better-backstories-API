const express = require("express");
const router = express.Router();

// @route api/auth
// @desc test route
// @access public
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
