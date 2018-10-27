import { SET_LOADER } from '../../actions/global/actionsTypes';

const INITIAL_STATE = {
  loader: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loader: !action.payload
      };

    default:
      return state;
  }
};
