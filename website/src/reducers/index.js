import { combineReducers } from 'redux';
import BrandReducer from './reducer_brand';

const rootReducer = combineReducers({
  brand: BrandReducer
});

export default rootReducer;
