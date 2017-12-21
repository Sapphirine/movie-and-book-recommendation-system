import React, { Component } from 'react';
import { getBookRecommendList, getBookNewUserList, getAllBooks } from '../util';
import BookItem from './book_item';
import './book.css';

export default class BookRecommend extends Component {
  constructor(props) {
    super(props);
    var params = props.match.params;

    this.state = {
      userId: params.id,
      list: [],
      selection: ['active','no-active'],
    };

    this.selectSearch = this.selectSearch.bind(this);
    this.toMovie = this.toMovie.bind(this);
    this.signout = this.signout.bind(this);
  }

  selectSearch() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/books/' + userId + '/search/all'
    window.location.replace(toUrl);
  }

  toMovie() {
    var toUrl = 'http://localhost:3000/movies/'+ this.state.userId + '/recommend';
    window.location.replace(toUrl);
  }

  signout() {
    var toUrl = 'http://localhost:3000';
    window.location.replace(toUrl);
  }

  componentWillMount() {
    var oldUser = false;
    var userId = this.state.userId;

    var recommendRef = getBookRecommendList(userId);
    recommendRef.on('value',function(dataSnapshot) {
      var item = dataSnapshot.val();
      if(item != null) {
        var list = [];
        oldUser = true;
        for(var att in item) {
          list = item[att].split(',');
        }
        this.setState({
          list:list
        });
      }
    }.bind(this))

    setTimeout((oldUser) => {
      if(!oldUser) {
        var newUserRef = getBookNewUserList();
        newUserRef.on('value',function(dataSnapshot) {
          var item = dataSnapshot.val();
          var list = [];
          for(var att in item) {
            list = item[att].split(',');
          }
          this.setState({
            list:list
          });
        }.bind(this))
      }
    },500)
  }

  componentDidMount() {}

  render() {
    var books = [];
    var list = this.state.list;
    for(var i = 0; i < Math.min(20,list.length); i++) {
      books.push(
        <div style={{marginBottom:'20px'}}>
          <BookItem
            id={list[i]}
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
            <li className={this.state.selection[0]}>Daily Recommendation</li>
            <li className={this.state.selection[1]} onClick={this.selectSearch}>Search books</li>
          </ul>
        </div>

        <div>
          <div className='book-recommend-title'>We guess you may like these books</div>
          <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'20px'}}>
            {books}
          </div>
        </div>

      </div>
    );
  }
}
