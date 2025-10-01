Installation & Setup
1. Install MongoDB Community Edition

Follow the official MongoDB installation guide for your operating system:

Windows: Install MongoDB on Windows

macOS: Install MongoDB on macOS

Linux: Install MongoDB on Linux

This installs:

mongod → MongoDB server

mongosh → MongoDB shell (used to run commands)

2. Start the MongoDB Server
mongodb

3. Connect to MongoDB

Open another terminal:

mongosh

📝 Tasks
Task 1: Database & Collection Setup

Create (or switch to) the database:

use plp_bookstore


Create a collection named books:

db.createCollection("books")

Task 2: Basic CRUD Operations
Insert Books

Insert at least 10 books into the books collection:

db.books.insertMany([
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    published_year: 1958,
    price: 12.99,
    in_stock: true,
    pages: 209,
    publisher: "Heinemann"
  },
  {
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    genre: "Romance",
    published_year: 2013,
    price: 18.75,
    in_stock: false,
    pages: 588,
    publisher: "Knopf"
  }
  // ... add 8+ more books
]);

Queries

Find all books in a specific genre:

db.books.find({ genre: "Fiction" });


Find books published after a certain year:

db.books.find({ published_year: { $gt: 2000 } });


Find books by a specific author:

db.books.find({ author: "Chimamanda Ngozi Adichie" });


Update the price of a book:

db.books.updateOne(
  { title: "Things Fall Apart" },
  { $set: { price: 14.99 } }
);


Delete a book by title:

db.books.deleteOne({ title: "So Long a Letter" });

Task 3: Advanced Queries

Books in stock & published after 2010:

db.books.find({ in_stock: true, published_year: { $gt: 2010 } });


Projection (show only title, author, price):

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });


Sort by price:

db.books.find().sort({ price: 1 });   // ascending
db.books.find().sort({ price: -1 });  // descending


Pagination (5 books per page):

db.books.find().skip(0).limit(5); // page 1
db.books.find().skip(5).limit(5); // page 2

Task 4: Aggregation Pipelines

Average price of books by genre:

db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);


Author with the most books:

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);


Group by publication decade:

db.books.aggregate([
  {
    $project: {
      decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

Task 5: Indexing

Indexes improve performance of queries.

Create index on title:

db.books.createIndex({ title: 1 });


Compound index on author + published_year:

db.books.createIndex({ author: 1, published_year: -1 });


Test performance with explain():

db.books.find({ title: "Americanah" }).explain("executionStats");

db.books.find({ author: "Chimamanda Ngozi Adichie", published_year: { $gt: 2000 } }).explain("executionStats");


Look for:

COLLSCAN → collection scan (slower)

IXSCAN → index scan (faster)

✅ Expected Outcomes

A functioning MongoDB database plp_bookstore with structured book data.

Working CRUD operations (insert, find, update, delete).

Advanced queries with projection, sorting, and pagination.

Aggregations that analyze and group data.

Indexes that improve performance (IXSCAN instead of COLLSCAN).