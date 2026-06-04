const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const adminController = require("../controller/adminController");

// GET /api/admin/users
router.get(
  "/users",
  auth,
  role(["admin"]),
  adminController.getAllUsers
);

module.exports = router;
