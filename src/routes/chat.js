const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const chatController = require("../controller/chatController");

// GET /api/chat/dashboard
router.get(
  "/dashboard",
  auth,
  role(["user", "admin"]),
  chatController.dashboard
);

module.exports = router;
