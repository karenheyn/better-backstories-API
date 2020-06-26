const express = require("express");
const router = express.Router();

// @route GET /pdf
// @desc pdf download
// @access public
router.get("/", async (req, res) => {
  try {
    res.sendFile("BBbundle.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
