import React, { Component } from 'react';
import StarRating from 'react-star-rating';
import StarRatingComponent from 'react-star-rating-component';
import { getBookInfo, getBookImage, postBookUserRating } from '../util';
import './book.css';

export default class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      imageURL: null,
      bookTitle: null,
      bookYear:null,
      bookAuthor:null,
      bookTitle:null,
      canRate: true,
      rating: 1.5,
      editing:true,
      alreadySubmit:'',
    });

    this.handleStarClick = this.handleStarClick.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  componentWillMount() {
    var bookId = this.props.id;
    console.log(bookId);
    var path = 'book_image/'+bookId+'.jpg';
    getBookImage(path,(url) => {
      this.setState({
        imageURL:url
      })
    }, (error) => {
        console.log(error);
    });

    var bookRef = getBookInfo(bookId);
    bookRef.on('value',function(dataSnapshot) {
      var bookTitle = '';
      var bookAuthor = '';
      var bookYear = '';
      var bookPublisher = '';
      dataSnapshot.forEach(function(child) {
        var item = child.val();
        bookTitle = item['title'];
        bookAuthor = item['author'];
        bookYear = item['year'];
        bookPublisher = item['publisher']
      })
      this.setState({
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookYear: bookYear,
        bookPublisher: bookPublisher
      });
    }.bind(this))
  }

  handleSubmit(e) {
    e.preventDefault();
    var currentUrl = 'http://localhost:3000/';
    var toUrl = currentUrl + this.state.type.toLowerCase() + '/' + this.name.value;
    window.location.replace(toUrl);
  }

  handleStarClick(next,prev,name) {
    this.setState({
      rating:next
    })
  }

  submitRating() {
    postBookUserRating(this.props.userId,this.props.id,this.state.rating);
    this.setState({
      editing:false,
      alreadySubmit:'You have submitted your rating on this book'
    });
  }

  render() {
    var rateName = 'rate-book-'+this.props.id;

    //console.log(this.props.id);

    return(
      <div>
        <div><button hidden={true} id='update-info' onClick={this.update}></button></div>
        <div className='book-item-container'>
          <div className='book-image'>
            <img src={this.state.imageURL} style={{height:'300px',width:'80%'}}/>
          </div>
          <div className='book-text'>
            <div className='book-title'>{this.state.bookTitle}</div>
            <div className='book-intro'>{this.state.bookAuthor}</div>
            <div className='book-intro'>{this.state.bookPublisher}</div>
            <div className='book-intro'>{this.state.bookYear}</div>
            <div style={{fontSize:'30px'}}>
              <StarRatingComponent
                name={rateName}
                starCount={10}
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
