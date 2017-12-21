
import { FETCH_BRAND } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_BRAND:
    // debugger
    return [ action.payload.data, ...state ];
  default:
    return state;
  }
}
