# Library Management System

A Node.js-based backend for managing a library's operations, including books, users, borrowing and returning records, and reports on popular or borrowed books. This system uses JWT for authentication and MongoDB for data storage.

## Features

- _User Authentication_: Register and login with password hashing using bcrypt and secure JWT tokens.
- _Book Management_: Admins can manage the library’s book collection (add, update, delete).
- _Borrowing & Returning Books_: Users can borrow and return books, with automatic due date calculation.
- _Reporting (Admin)_: Admins can generate reports of currently borrowed books and popular books.
- _Error Handling_: Centralized error handling and improved error messaging with http-errors.

## Technologies Used

- _Node.js & Express_: Backend framework.
- _MongoDB & Mongoose_: Database and ODM for managing data.
- _JWT_: Token-based authentication.
- _bcrypt_: Secure password hashing.
- _http-errors_: Error handling.
- _dotenv_: Manage environment variables.

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/library-management-system.git

2. Navigate to the project directory:
   cd library-management-system

3. Install the dependencies:
   npm install

4. Set up environment variables by creating a .env file in the root directory and adding:

   DB_URL=mongodb://localhost:27017/librarydb
   JWT_SECRET_KEY=shhhhhh

## Usage

1. _Run the application_:

   - For development (using nodemon for live-reloading):
     bash
     npm run dev
   - For production:
     bash
     npm start

2. _Access the API_:
   After running the application, the server will be available at http://localhost:3000 (or any other port you configure in your .env file).

3. _API Endpoints_:

   ### Authentication

   - _POST_ /users/register: Register a new user.
   - _POST_ /users/login: Login and get a JWT token.

   ### Books

   - _POST_ /books: Add a new book (Admin only).
   - _GET_ /books: Get all books.
   - _PUT_ /books/:id: Update a book by ID (Admin only).
   - _DELETE_ /books/:id: Delete a book by ID (Admin only).

   ### Borrowing

   - _POST_ /borrowing/borrow: Borrow a book (requires JWT).
   - _POST_ /borrowing/return: Return a borrowed book (requires JWT).
   - _GET_ /borrowing/history: Get the borrowing history for the logged-in user (requires JWT).

   ### Reports (Admin)

   - _GET_ /reports/borrowed: Get a report of all currently borrowed books.
   - _GET_ /reports/popular: Get a report of the most popular books.

## Project Structure

    library-management-system/
    
    models/             # Contains Mongoose models (Book, User, BorrowingHistory)
    routes/             # API routes for books, users, borrowing, and reports
    controllers/        # Request handlers for each route
    app.js              # Main entry point of the application
    .env                # Environment variables
    package.json        # Node.js dependencies and scripts
    README.md           # Project documentation
