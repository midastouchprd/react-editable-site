import "isomorphic-fetch";
import * as types from '../actions';

// Action Creators
const getInitalState = state => ({ type: types.FETCH_INITIAL_STATE, payload: state });

export const fetchInitialState = () => (dispatch, getState) => {
  dispatch(getInitalState());
  return fetch("http://localhost:3000/api/")
    .then(response => response.json())
    .then(news => console.log(news))
    .catch(err => console.log(err));
};
