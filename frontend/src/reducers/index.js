import { combineReducers } from 'redux';

import PostsReducer from './posts';
import CommentsReducer from './comments';
import GlobalReducer from './global';
import CategoriesReducer from './categories';

export default combineReducers({
  GlobalReducer,
  PostsReducer,
  CommentsReducer,
  CategoriesReducer
});
