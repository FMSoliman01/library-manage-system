const express = require('express');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose'); 
const app = express();
const port = 3001;
const bookRoutes = require('./routes/BookRoute');
const borrowingRoutes = require('./routes/BorrowingRoute');
const userRoutes = require('./routes/userRoute');
const reportsRoutes = require('./routes/reports');

const bodyParser = require('body-parser');



mongoose.connect("mongodb+srv://fmsoliman01:5vMKUhy2QtdPYBww@cluster0.mbkjp.mongodb.net/myLibrary?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  app.use('/books', bookRoutes);
app.use('/borrowing', borrowingRoutes);
app.use('/users', userRoutes);
app.use('/reports', reportsRoutes);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.log('MongoDB connection error:', err);
});


app.get('/', (req, res) => {
  res.send('Hello to my library!');
});
