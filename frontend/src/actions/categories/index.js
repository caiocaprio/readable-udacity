import { GET_CATEGORIES } from './actionsTypes.js';

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.books);
