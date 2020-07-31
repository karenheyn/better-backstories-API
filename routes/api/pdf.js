const express = require("express");
const router = express.Router();

// @route GET /pdf
// @desc pdf download
// @access public
router.get("/basicdeckss", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Basic_Deck_SS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/cardbundless", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Card_Bundle_SS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/bundlewithboxss", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Full_Bundle_with_Box_SS.pdf", {
      root: "pdf",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/mysticalboosterss", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Mystical_Booster_SS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/technicalboosterss", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Technical_Booster_SS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/basicdeckds", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Basic_Deck_DS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/cardbundleds", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Card_Bundle_DS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/bundlewithboxds", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Full_Bundle_with_Box_DS.pdf", {
      root: "pdf",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/mysticalboosterds", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Mystical_Booster_DS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/technicalboosterds", async (req, res) => {
  try {
    res.sendFile("single_sided/BBS_Technical_Booster_DS.pdf", { root: "pdf" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
