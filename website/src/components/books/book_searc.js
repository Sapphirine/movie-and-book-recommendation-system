import React, { Component } from 'react';
import { getBookRecommendList, getBookNewUserList, getAllBooks } from '../util';
import BookItem from './book_item';
import './book.css';

export default class BookSearch extends Component {
  constructor(props) {
    super(props);
    var params = props.match.params;

    this.state = {
      userId: params.id,
      keyWord: params.key,
      selection: ['no-active','active'],
      targetBooks:[],
    };

    this.selectRecommend = this.selectRecommend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listAll = this.listAll.bind(this);
    this.toMovie = this.toMovie.bind(this);
    this.signout = this.signout.bind(this);
  }

  selectRecommend() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/books/' + userId + '/recommend';
    window.location.replace(toUrl);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.title.value.length > 0) {
      var searchKey = this.title.value.toLowerCase();
      var userId = this.state.userId;
      var toUrl = 'http://localhost:3000/books/' + userId + '/search/' + searchKey;
      window.location.replace(toUrl);
    }
  }

  listAll() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/books/' + userId + '/search/all';
    window.location.replace(toUrl);
  }

  toMovie() {
    var toUrl = 'http://localhost:3000/movies/'+ this.state.userId + '/search/all';
    window.location.replace(toUrl);
  }

  signout() {
    var toUrl = 'http://localhost:3000';
    window.location.replace(toUrl);
  }

  componentWillMount() {
    var bookRef = getAllBooks();

    var website = window.location.href.split('/');
    var keyWord = website[website.length-1];
    if(keyWord == 'all') {
      var targetBooks = [];
      bookRef.on('value',function(dataSnapshot) {
        dataSnapshot.forEach(function(book) {
          var bookId = book.key;
          book.forEach(function(child) {
            //console.log(child.val());
            var ele = {
              id: bookId,
              title: child.val()['title'],
              author: child.val()['author'],
              year: child.val()['year'],
              publisher: child.val()['publisher']
            }
            targetBooks.push(ele);
          })
        });
        this.setState({
          targetBooks: targetBooks,
        });
      }.bind(this))
    } else {
      var targetBooks = [];
      bookRef.on('value',function(dataSnapshot) {
        dataSnapshot.forEach(function(book) {
          var bookId = book.key;
          book.forEach(function(child) {
            if(child.val()['title'].toLowerCase().includes(keyWord.toLowerCase())) {
              targetBooks.push({
                id: bookId,
                title: child.val()['title'],
                author: child.val()['author'],
                year: child.val()['year'],
                publisher: child.val()['publisher']
              });
            }
          });
        });
        this.setState({
          targetBooks: targetBooks,
        });
      }.bind(this))
    }
  }

  componentDidMount() {}

  render() {
    setTimeout(() => {},1000);

    var books = [];
    var targetBooks = this.state.targetBooks;
    for(var i = 0 ; i < targetBooks.length; i++) {
      console.log(targetBooks[i]);
      books.push(
        <div style={{marginBottom:'20px'}}>
          <BookItem
            id={targetBooks[i]['id']}
            userId={this.state.userId}
          />
          <hr />
        </div>
      );
    }

    return(
      <div>

        <div className='book-navbar'>
          <div className='welcome-message'>Welcome to our book recommend system</div>
          <hr id='book-navbar-hr'/>
        </div>

        <div style={{float:'right',marginRight:'10px'}}>
          <button onClick={this.toMovie}>to movies</button>
          <button onClick={this.signout}>sign out</button>
        </div>

        <div className="tab">
          <ul className="title-ul">
            <li className={this.state.selection[0]} onClick={this.selectRecommend}>Daily Recommendation</li>
            <li className={this.state.selection[1]} onClick={this.selectSearch}>Search Books</li>
          </ul>
        </div>

        <div>
          <div className='book-recommend-title'>
            <form onSubmit={this.handleSubmit}>
              <input className='search-input' ref={(title) => this.title = title} />
              <button style={{marginLeft:'15px'}} className='book-button' type='submit'>search</button>
              <button className='book-button' onClick={this.listAll}>List All</button>
            </form>
          </div>
          <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'20px'}}>
            {books}
          </div>
        </div>

      </div>
    );
  }
}
