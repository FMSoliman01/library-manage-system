const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/BookController");
const permit = require("../middlewares/authorization");
const { borrowBook } = require("../controllers/BrrowingController");

const router = express.Router();

router.post("/:id/borrow", verifyToken, borrowBook);
router.get("/", getAllBooks);
router.post("/", verifyToken, permit("admin"), addBook);
router.put("/:id", verifyToken, permit("admin"), updateBook);
router.delete("/:id", verifyToken, permit("admin"), deleteBook);

module.exports = router;
