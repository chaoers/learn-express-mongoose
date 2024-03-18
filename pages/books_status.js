let BookInstance = require('../models/bookinstance');

BookInstance.find('status': {$eq: "Available"}).populate('book').exec().then(
    list_BookInstance
)
exports.show_all_books_status = function(res) {
  return res.send([]);
}