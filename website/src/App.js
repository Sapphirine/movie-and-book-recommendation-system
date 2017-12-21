import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      userId: '',
      type:'movies',
      typeIndex:0,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.typeChange = this.typeChange.bind(this);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    //console.log(this.name.value);
    //console.log(this.state.type);
    var currentUrl = 'http://localhost:3000/';
    var toUrl = currentUrl + this.state.type.toLowerCase() + '/' + this.name.value + '/recommend';
    window.location.replace(toUrl);
  }

  typeChange(item) {
    this.setState({
      type:item['label'],
      typeIndex:item['id']-1
    });
  }


  render() {
    const selectType = [
      {
        id: 1,
        label: 'Movies'
      },{
        id: 2,
        label: 'Books'
      }
    ]

    return (
      <div>
        <div className='main-welcome-message'>Welcome, we are recommending you movies and books you really like</div>
        <hr id='main-navbar-hr'/>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input className="user-input" placeholder="User Name" ref={(userName) => this.name = userName} required/>
          </div>
          <div style={{marginLeft:'42%'}} className='form-group'>
            <Select
              className='select-type'
              clearable={false}
              options={selectType}
              onChange={this.typeChange}
              value={selectType[this.state.typeIndex]}
              openOnClick={false}
              searchable={false}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='main-page-login-button'>Log in</button>
          </div>
        </form>
      </div>
    );
  }
}
