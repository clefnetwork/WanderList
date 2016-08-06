import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import ListsReducer from './reducer_lists';
import AuthReducer from './reducer_auth';
import Comments from './reducer_comments';

const rootReducer = combineReducers({
  lists: ListsReducer,
  form: formReducer,
  routing: routerReducer,
  auth: AuthReducer,
  comment: Comments
});

export default rootReducer;
