
//  CRUD Queries 

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by a specific author
db.books.find({ author: "Chimamanda Ngozi Adichie" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Things Fall Apart" },
  { $set: { price: 14.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "So Long a Letter" });



// Task 3: Advanced Queries

// 1. Find books that are in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection → return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sorting books by price
db.books.find().sort({ price: 1 });   // Ascending
db.books.find().sort({ price: -1 });  // Descending

// 4. Pagination (5 books per page)
// Page 1
db.books.find().skip(0).limit(5);
// Page 2
db.books.find().skip(5).limit(5);



// Task 4: Aggregation Pipeline

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group by publication decade and count
db.books.aggregate([
  {
    $project: {
      decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// Task 5: Indexing

// 1. Create index on title
db.books.createIndex({ title: 1 });

// 2. Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Explain query performance
db.books.find({ title: "Americanah" }).explain("executionStats");
db.books.find({ author: "Chimamanda Ngozi Adichie", published_year: { $gt: 2000 } }).explain("executionStats");