import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import MovieRecommend from './components/movies/movie_recommend';
import MovieSearch from './components/movies/movie_search';
import BookRecommend from './components/books/book_recommend';
import BookSearch from './components/books/book_searc';

import App from './App';
import './index.css';


const history = createHistory();
const middleWare = routerMiddleware(history);
const createStoreWithMiddleware = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, middleWare)));

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/movies/:id/recommend" component={MovieRecommend} />
          <Route path="/movies/:id/search/:key" component={MovieSearch} />
          <Route path="/books/:id/recommend" component={BookRecommend} />
          <Route path="/books/:id/search/:key" component={BookSearch} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
