// import { seededBrands } from '../brandSeedData';
import axios from 'axios'

export const FETCH_BRAND = 'FETCH_BRAND';
// const path = `/search_results/${brand}`;

export function fetchBrand(brand) {
  // debugger
  const endpoint = 'http://localhost:3000';
  const path = '/search-results';
  // const request = axios.get(`${endpoint}${path}`);
  return function(dispatch) {
    // debugger
    dispatch({
      type: FETCH_BRAND,
      payload: "Success"
    })
    // data: "Success"

    axios
    .get(`${endpoint}${path}`)
    .then(function(response) {
      // debugger
    })
    .catch(function(err) {
      console.log(err)
    })

  }
  // debugger
  // return {
  //   type: FETCH_BRAND,
  //   payload: request
  // };
}
