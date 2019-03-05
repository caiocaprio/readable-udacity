import { GET_CATEGORIES } from "./actionsTypes.js";
import { api, headers } from "../../contants";

export const getCategories = () => async dispatch => {
  const response = await fetch(`${api}/categories`, { headers });
  const payload = await response.json();

  dispatch({
    type: GET_CATEGORIES,
    payload
  });
};
