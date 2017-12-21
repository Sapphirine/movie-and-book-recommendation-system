import React, { Component } from 'react';
import { getRecommendList, getNewUserList, getAllMovies } from '../util';
import MovieItem from './movie_item';
import './movie.css';

export default class MovieSearch extends Component {
  constructor(props) {
    super(props);
    var params = props.match.params;

    this.state = {
      userId: params.id,
      keyWord: params.key,
      selection: ['no-active','active'],
      targetMovies:[],
    };

    this.selectRecommend = this.selectRecommend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listAll = this.listAll.bind(this);
    this.toBook = this.toBook.bind(this);
    this.signout = this.signout.bind(this);
  }

  selectRecommend() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/movies/' + userId + '/recommend';
    window.location.replace(toUrl);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.title.value.length > 0) {
      var searchKey = this.title.value.toLowerCase();
      var userId = this.state.userId;
      var toUrl = 'http://localhost:3000/movies/' + userId + '/search/' + searchKey;
      window.location.replace(toUrl);
    }
  }

  listAll() {
    var userId = this.state.userId;
    var toUrl = 'http://localhost:3000/movies/' + userId + '/search/all';
    window.location.replace(toUrl);
  }

  toBook() {
    var toUrl = 'http://localhost:3000/books/'+ this.state.userId + '/search/all';
    window.location.replace(toUrl);
  }

  signout() {
    var toUrl = 'http://localhost:3000';
    window.location.replace(toUrl);
  }

  componentWillMount() {
    var movieRef = getAllMovies();

    var website = window.location.href.split('/');
    var keyWord = website[website.length-1];
    if(keyWord == 'all') {
      var targetMovies = [];
      movieRef.on('value',function(dataSnapshot) {
        dataSnapshot.forEach(function(child) {
          var ele = {
            id: child.key,
            title: child.val()['name'],
            intro: child.val()['intro'],
          }
          targetMovies.push(ele);
        });
        this.setState({
          targetMovies: targetMovies,
        });
      }.bind(this))
    } else {
      console.log(keyWord);
      var targetMovies = [];
      movieRef.on('value',function(dataSnapshot) {
        dataSnapshot.forEach(function(child) {
          if(child.val()['name'].toLowerCase().includes(keyWord.toLowerCase())) {
            targetMovies.push({
              id: child.key,
              title: child.val()['name'],
              intro: child.val()['intro'],
            });
          }
        });
        this.setState({
          targetMovies: targetMovies,
        });
      }.bind(this))
    }
  }

  componentDidMount() {}

  render() {
    setTimeout(() => {},500);

    var movies = [];
    var targetMovies = this.state.targetMovies;
    console.log(targetMovies);
    for(var i = 0 ; i < targetMovies.length; i++) {
      //console.log(targetMovies[i]['title']);
      movies.push(
        <div style={{marginBottom:'20px'}}>
          <MovieItem
            id={targetMovies[i]['id']}
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
            <li className={this.state.selection[0]} onClick={this.selectRecommend}>Daily Recommendation</li>
            <li className={this.state.selection[1]} onClick={this.selectSearch}>Search Movies</li>
          </ul>
        </div>

        <div>
          <div className='movie-recommend-title'>
            <form onSubmit={this.handleSubmit}>
              <input className='search-input' ref={(title) => this.title = title} />
              <button style={{marginLeft:'15px'}} className='movie-button' type='submit'>search</button>
              <button className='movie-button' onClick={this.listAll}>List All</button>
            </form>
          </div>
          <div style={{marginLeft:'15%',marginRight:'15%',marginTop:'20px'}}>
            {movies}
          </div>
        </div>

      </div>
    );
  }
}
