import React, { Component } from 'react';
import { getRecommendList, getNewUserList, getAllMovies } from '../util';
import MovieItem from './movie_item';
import './movie.css';

export default class MovieRecommend extends Component {
  constructor(props) {
    super(props);
    var params = props.match.params;

    this.state = {
      userId: params.id,
      list: [],
      selection: ['active','no-active'],
    };

    this.selectSearch = this.selectSearch.bind(this);
    this.toBook  = this.toBook.bind(this);
    this.signout = this.signout.bind(this);
  }

  selectSearch() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/movies/' + userId + '/search/all'
    window.location.replace(toUrl);
  }

  toBook() {
    var toUrl = 'http://localhost:3000/books/'+ this.state.userId + '/recommend';
    window.location.replace(toUrl);
  }

  signout() {
    var toUrl = 'http://localhost:3000';
    window.location.replace(toUrl);
  }

  componentWillMount() {
    var oldUser = false;
    var userId = this.state.userId;

    var recommendRef = getRecommendList(userId);
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
        var newUserRef = getNewUserList();
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
    var movies = [];
    var list = this.state.list;
    console.log(list);
    for(var i = 0; i < Math.min(10,list.length); i++) {
      movies.push(
        <div style={{marginBottom:'20px'}}>
          <MovieItem
            id={list[i]}
            userId={this.state.userId}
          />
          <hr />
        </div>
      );
    }

    return(
      <div>

        <div className='movie-navbar'>
          <div className='welcome-message'>Welcome to our movie recommend system</div>
          <hr id='movie-navbar-hr'/>
        </div>

        <div style={{float:'right',marginRight:'10px'}}>
          <button onClick={this.toBook}>to books</button>
          <button onClick={this.signout}>sign out</button>
        </div>

        <div className="tab">
          <ul className="title-ul">
            <li className={this.state.selection[0]}>Daily Recommendation</li>
            <li className={this.state.selection[1]} onClick={this.selectSearch}>Search Movies</li>
          </ul>
        </div>

        <div>
          <div className='movie-recommend-title'>We guess you may like these movies</div>
          <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'20px'}}>
            {movies}
          </div>
        </div>

      </div>
    );
  }
}
