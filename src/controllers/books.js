const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('librarydb').collection('books').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const addBook = async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre,
    status: req.body.status
  };
  const response = await mongodb.getDb().db('librarydb').collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};

const updateBook = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre,
    status: req.body.status
  };
  const response = await mongodb
    .getDb()
    .db('librarydb')
    .collection('books')
    .replaceOne({ _id: userId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
};

const deleteBook = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('librarydb').collection('books').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  addBook,
  updateBook,
  deleteBook
};
