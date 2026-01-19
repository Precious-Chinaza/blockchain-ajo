const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
    res.json({
        status: "success",
        message: "blockchain ajo backend is live!",
    });
});

module.exports = router;