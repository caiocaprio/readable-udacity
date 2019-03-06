import { GET_CATEGORIES } from "../../actions/categories/actionsTypes";

const INITIAL_STATE = {
  categories: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: {
          ...action.payload.categories
        }
      };

    default:
      return state;
  }
};
