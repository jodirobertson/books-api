var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:jodidoesdatabase@localhost:5432/booklist';
var db = pgp(connectionString);

// returns a list of all books in the have_read db
function getAllBooks(req, res, next) {
  db.any('select * from have_read')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all books'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// returns the book with the given title appended to the GET request in the URL
function getSpecificBook(req, res, next) {
  var title = req.params.id;
  db.one('select * from have_read where title = $1', title)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved specific book'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// adds a book to the database if the title does not already exist
function addBook(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into have_read(title, author, finished_on, genre, keywords)' +
      'values(${title}, ${author}, ${finished_on}, ${genre}, ${keywords})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one book'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// updates book when current title matches id appended at end of URL during PUT request
// note: this means that you cannot change the title of an entry, only the other fields. 
// (if you need to change the title, you must delete the entry)
function updateBook(req, res, next) {
  db.none('update have_read set title=$1, author=$2, finished_on=$3, genre=$4, keywords=$5 where title = $6',
    [req.body.title, req.body.author, req.body.finished_on,
      req.body.genre, req.body.keywords, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated book'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// deletes the book entry whose title matches the appended name in the DELETE request
function removeBook(req, res, next) {
  var title = req.params.id;
  db.result('delete from have_read where title = $1', title)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed title'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllBooks: getAllBooks,
  getSpecificBook: getSpecificBook,
  addBook: addBook,
  updateBook: updateBook,
  removeBook: removeBook
};
