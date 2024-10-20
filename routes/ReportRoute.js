const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const {
  getCurrentlyBorrowedBooks,
  getPopularBooks,
} = require("../controllers/ReportController");
const permit = require("../middlewares/authorization");

const router = express.Router();

// Route to get currently borrowed books
router.get(
  "/borrowed",
  verifyToken,
  permit("admin"),
  getCurrentlyBorrowedBooks
);

// Route to get popular books
router.get(
  "/popular",
  verifyToken,
  permit("admin"),
  getPopularBooks);

module.exports = router;
