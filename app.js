require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/BookRoute");
const borrowingRoutes = require("./routes/BorrowingRoute");
const userRoutes = require("./routes/UserRoute");
const reportsRoutes = require("./routes/ReportRoute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  routes
app.use("/books", bookRoutes);
app.use("/borrowing", borrowingRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportsRoutes);

app.get("/", (req, res) => {
  res.send("Hello to my library!");
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Something went wrong, please try again later.",
  });
});

module.exports = app;
