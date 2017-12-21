import { db, storageRef } from './constants';

// movies
export function getNewUserList() {
  var recommendRef = db.ref('/list_for_new');
  return recommendRef;
}

export function getRecommendList(user_id) {
  var recommendRef = db.ref('/user_recommendation/'+user_id);
  return recommendRef;
}

export function getMovieInfo(movie_id) {
  var movieRef = db.ref('/movie_infos/'+movie_id);
  return movieRef;
}

export function getAllMovies() {
  var movieRef = db.ref('/movie_infos');
  return movieRef
}

export function getMovieImage(path,callback,callbackError) {
  storageRef.child(path).getDownloadURL().then((url) => {
      callback(url);
  }).catch((error) => {
      callbackError(error);
  });
}

export function postUserRating(user_id,movie_id,rating) {
  var postData = {
    rating: rating
  };
  var updates = {};
  updates['/daily_user_rating/' + user_id + '/' + movie_id] = postData;

  db.ref().update(updates);
}

// books
export function getBookNewUserList() {
  var recommendRef = db.ref('/book_list_for_new');
  return recommendRef;
}

export function getBookRecommendList(user_id) {
  var recommendRef = db.ref('/book_user_recommendation/'+user_id);
  return recommendRef;
}

export function getBookInfo(book_id) {
  var bookRef = db.ref('/book_infos/'+book_id);
  return bookRef;
}

export function getAllBooks() {
  var movieRef = db.ref('/book_infos');
  return movieRef
}

export function getBookImage(path,callback,callbackError) {
  storageRef.child(path).getDownloadURL().then((url) => {
      callback(url);
  }).catch((error) => {
      callbackError(error);
  });
}

export function postBookUserRating(user_id,book_id,rating) {
  var postData = {
    rating: rating
  };
  var updates = {};
  updates['/book_daily_user_rating/' + user_id + '/' + book_id] = postData;

  db.ref().update(updates);
}
