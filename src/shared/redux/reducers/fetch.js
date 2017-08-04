import * as types from '../actions';


export default(state = {}, action) => {
  switch (action.type) {
    case types.FETCH_INITIAL_STATE:
      return { ...state, news: action.payload };

    default:
      return state;
  }
}
