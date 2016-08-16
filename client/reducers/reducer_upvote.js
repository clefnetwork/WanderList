import {FETCH_UP} from '../actions/index';

const INITIAL_STATE = {
  upvotes: []
};


export default function(state = INITIAL_STATE, action) {
  console.log("upboat captain", action.payload);
  switch(action.type) {
    case FETCH_UP:
      return { ...state, upvotes: action.payload} ;
      //return state;
    default:
      return state;
  }
}