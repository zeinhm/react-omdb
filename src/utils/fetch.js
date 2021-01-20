import axios from 'axios';
import {API_KEY, API_KEY_QUERY, API_URL} from '../constants'

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const fetchMovies = async payload => (
  await fetch(`${API_URL}/?${API_KEY_QUERY}=${API_KEY}&s=${payload.search}&page=${payload.page}`, 'get')
)

export const fetchMovieDetail = async id => (
  await fetch(`${API_URL}/?${API_KEY_QUERY}=${API_KEY}&i=${id}`, 'get')
)