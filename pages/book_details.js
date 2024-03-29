let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');
const { ObjectId } = require('mongoose').Types;

function isValidObjectId(id) {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}


function get_book(id) {
    if (!isValidObjectId(id)) {
        return ({ status: "error", message: "Invalid ID format" });
    }
    return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
    if (!isValidObjectId(id)) {
        return ({ status: "error", message: "Invalid ID format" });
    }
  return BookInstance
          .find({ 'book': id })
          .select('imprint status');
}

exports.show_book_dtls = async (res, id) => {

  try {
      const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}
