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
  const contact = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre,
    status: req.body.status
  };
  const response = await mongodb.getDb().db('librarydb').collection('books').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};


module.exports = {
  getAll,
  addBook
};
