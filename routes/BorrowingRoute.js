const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const {
  returnBook,
  getUserBorrowingHistory,
} = require("../controllers/BrrowingController");

const router = express.Router();

router.post("/:borrowingId/return", verifyToken, returnBook);

router.get("/history", verifyToken, getUserBorrowingHistory);

module.exports = router;
