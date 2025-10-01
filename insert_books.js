// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Insert at least 10 book documents
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
    title: "Petals of Blood",
    author: "Ngugi wa Thiong'o",
    genre: "Political Fiction",
    published_year: 1977,
    price: 15.50,
    in_stock: true,
    pages: 400,
    publisher: "East African Publishing House"
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
  },
  {
    title: "The Famished Road",
    author: "Ben Okri",
    genre: "Magical Realism",
    published_year: 1991,
    price: 14.00,
    in_stock: true,
    pages: 500,
    publisher: "Jonathan Cape"
  },
  {
    title: "Season of Migration to the North",
    author: "Tayeb Salih",
    genre: "Fiction",
    published_year: 1966,
    price: 10.99,
    in_stock: true,
    pages: 169,
    publisher: "Heinemann"
  },
  {
    title: "So Long a Letter",
    author: "Mariama Bâ",
    genre: "Drama",
    published_year: 1979,
    price: 9.99,
    in_stock: true,
    pages: 90,
    publisher: "Heinemann"
  },
  {
    title: "Nervous Conditions",
    author: "Tsitsi Dangarembga",
    genre: "Fiction",
    published_year: 1988,
    price: 11.99,
    in_stock: false,
    pages: 204,
    publisher: "Women’s Press"
  },
  {
    title: "Purple Hibiscus",
    author: "Chimamanda Ngozi Adichie",
    genre: "Coming-of-age",
    published_year: 2003,
    price: 13.99,
    in_stock: true,
    pages: 307,
    publisher: "Algonquin Books"
  },
  {
    title: "Half of a Yellow Sun",
    author: "Chimamanda Ngozi Adichie",
    genre: "Historical Fiction",
    published_year: 2006,
    price: 16.49,
    in_stock: true,
    pages: 448,
    publisher: "Knopf"
  },
  {
    title: "Devil on the Cross",
    author: "Ngugi wa Thiong'o",
    genre: "Satire",
    published_year: 1980,
    price: 12.50,
    in_stock: true,
    pages: 250,
    publisher: "Heinemann"
  }
]);

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 