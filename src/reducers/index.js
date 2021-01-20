import { combineReducers } from "redux";
import home from '../modules/Home/reducer';
import movieDetail from '../modules/MovieDetail/reducer';

export const rootReducer = combineReducers({ home, movieDetail });
