import React, { Component } from 'react';
import StarRating from 'react-star-rating';
import StarRatingComponent from 'react-star-rating-component';
import { getMovieInfo, getMovieImage, postUserRating } from '../util';
import './movie.css';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      imageURL: null,
      movieTitle: null,
      movieIntro: null,
      canRate: true,
      rating: 1.5,
      editing:true,
      alreadySubmit:'',
    });

    this.handleStarClick = this.handleStarClick.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  componentWillMount() {
    var movieId = this.props.id;
    console.log(movieId);
    var path = 'movie_image/'+this.props.id+'.jpg';
    getMovieImage(path,(url) => {
      this.setState({
        imageURL:url
      })
    }, (error) => {
        console.log(error);
    });

    var movieRef = getMovieInfo(movieId);
    movieRef.on('value',function(dataSnapshot) {
      var item = dataSnapshot.val();
      console.log(item);
      this.setState({
        movieTitle: item['name'],
        movieIntro: item['intro']
      });
    }.bind(this))
  }

  handleStarClick(next,prev,name) {
    this.setState({
      rating:next
    })
  }

  submitRating() {
    postUserRating(this.props.userId,this.props.id,this.state.rating);
    this.setState({
      editing:false,
      alreadySubmit:'You have submitted your rating on this movie'
    });
  }

  render() {
    var toUrl = 'https://movielens.org/movies/' + this.props.id;
    var rateName = 'rate-movie-'+this.props.id;

    //console.log(this.props.id);

    return(
      <div>

        <div className='movie-item-container'>
          <div className='movie-image'>
            <img src={this.state.imageURL} style={{height:'300px',width:'80%'}}/>
          </div>
          <div className='movie-text'>

            <div className='movie-title'><a style={{color:'black'}}href={toUrl}>{this.state.movieTitle}</a></div>
            <div className='movie-intro'>{this.state.movieIntro}</div>
            <div style={{fontSize:'30px'}}>
              <StarRatingComponent
                name={rateName}
                starCount={5}
                starSize={30}
                value={this.state.rating}
                onStarClick={this.handleStarClick}
                emptyStarColor='black'
                starColor='yellow'
                editing={this.state.editing}
              />
            </div>
            <div style={{marginBottom:'10px'}}>{this.state.alreadySubmit}</div>
            <div>
              <button className='submit-rating' onClick={this.submitRating}>submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
