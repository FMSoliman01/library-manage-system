const express = require('express');
const verifyToken= require ("../middlewares/verifyToken")

const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
// const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllBooks);
router.post('/',verifyToken,  addBook);
router.put('/:id',verifyToken,  updateBook);
 router.delete('/:id',verifyToken,  deleteBook);

module.exports = router;
