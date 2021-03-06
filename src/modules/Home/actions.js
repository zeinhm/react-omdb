import { FAILED, LOADING, SUCCESS } from './constants'
import { fetchMovies } from '../../utils/fetch'

export function getAutoComplete(payload) {
  const key = 'AutoComplete'
  return dispatch => {
    dispatch(loadingAction(true, key))

    fetchMovies(payload)
      .then(({ Error, Search : movies }) => {
        dispatch(successAction(movies, key))
        dispatch(failedAction(Error, key))
      })
      .catch(({ Error }) => dispatch(failedAction(Error, key)))
  }
}

export function getMovies(payload, offset, limit) {
  const key = 'GetMovies'
  return (dispatch, getState) => {
    const currentPage = getState().home.dataPage
    const shownMovie = getState().home.dataShownMovies
    const storeMovie = getState().home.dataStoreMovies
    dispatch(loadingAction(true, key))

    fetchMovies(payload)
      .then(({ Error, Response, Search: movies, totalResults }) => {
        dispatch(successAction({ movies, totalResults }, key))
        dispatch(setPage(payload.page))
        dispatch(failedAction(Error, key))
        const separatedData = movies?.slice(offset, limit)
        if (Response === "True") {
          if (shownMovie.length < 1 || currentPage < payload.page) {
            dispatch(getShownMovies([...shownMovie,...separatedData]))
          } else {
            dispatch(getShownMovies(movies))
          }
          
          if (storeMovie.length < 1 || currentPage < payload.page) {
            dispatch(storeMovies([...storeMovie, ...movies]))
          } else {
            dispatch(storeMovies(movies))
          }
        } 
      })
      .catch((Error) => {
        dispatch(storeMovies([]))  
        dispatch(getShownMovies([]))  
        console.log(Error)
      })
  }
}

export function getShownMovies(movies) {
  const key = 'ShownMovies'
  return dispatch => {
    dispatch(successAction(movies, key))
  }
}

export function storeMovies(movies) {
  const key = 'StoreMovies'
  return dispatch => {
    dispatch(successAction(movies, key))
  }
}

export function setPage(page) {
  const key = 'Page'
  return dispatch => {
    dispatch(successAction(page, key))
  }
}

export function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

export function successAction(data, key) {
  return { type: SUCCESS, data, key };
}