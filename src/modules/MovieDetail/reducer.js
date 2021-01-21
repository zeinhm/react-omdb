import { FAILED, LOADING, SUCCESS } from './constants';

const initialState = {
  dataMovieDetail: {},
  isLoadingMovieDetail: false,
  message: ''
};

export default function reducer(state = initialState, action) {
  const { data, isLoading, key, message, type} = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
        [`isLoading${key}`]: false,
      };
    case LOADING:
      return {
        ...state,
        [`isLoading${key}`]: isLoading,
      };
    case SUCCESS:
      return {
        ...state,
        [`data${key}`]: data,
        [`isLoading${key}`]: false,
      };
    default:
      return state;
  }
}
