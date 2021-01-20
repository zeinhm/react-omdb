import { FAILED, LOADING, SUCCESS } from './constants'
import { fetchMovieDetail } from '../../utils/fetch'

export function getMovieDetail(id) {
  const key = 'MovieDetail'
  return dispatch => {
    dispatch(loadingAction(true, key))

    fetchMovieDetail(id)
      .then((resp) => dispatch(successAction(resp, key)))
      .catch(error => dispatch(failedAction(error, key)))
  }
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

export function successAction(data, key) {
  return { type: SUCCESS, data, key };
}