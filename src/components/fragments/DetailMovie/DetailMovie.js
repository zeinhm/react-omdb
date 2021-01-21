import React from 'react'
import { useSelector } from 'react-redux'
import { PropagateLoader } from "react-spinners";
import defaultImg from '../../../assets/default-poster.jpg'
import './styles.scoped.css'

export default function DetailMovie() {
  const state = useSelector( state => state.movieDetail)
  const defaultPoster = (e) => {
    e.target.src = defaultImg
  }
  return (
    <main className='detail-card'>
     {(state?.dataMovieDetail && !state?.isLoadingMovieDetail) &&
        (
          <div className='container'>
            <div className='poster'>
              <img alt="Poster" src={state.dataMovieDetail.Poster} 
                onError={defaultPoster}/>
            </div>
            <div className='detail'>
              <h2>{state.dataMovieDetail.Title}</h2>
              <p>{state.dataMovieDetail.Plot}</p>
              <h3>{state.dataMovieDetail.Genre}</h3>
              <div className='more-info'>
                <div>
                  <span>Original Release:</span>
                  <h4>{state.dataMovieDetail.Released}</h4>
                </div>
                <div>
                  <span>Ratings:</span>
                  <h4>{state.dataMovieDetail.Ratings?.[0]?.Value}</h4>
                </div>
                <div>
                  <span>Runtime:</span>
                  <h4>{state.dataMovieDetail.Runtime}</h4>
                </div>
                <div>
                  <span>Box Office:</span>
                  <h4>{state.dataMovieDetail.BoxOffice}</h4>
                </div>
              </div>
              <div className='actors'>
                <h3>Actors:</h3>
                <span>{state.dataMovieDetail.Actors}</span>
              </div>
            </div>
          </div>
        )
      } 
      <a href="http://www.omdbapi.com/" target="_blank">Powered by OMDb API</a>
      <div className='loading-wrapper'>
        <PropagateLoader
          loading={state?.isLoadingMovieDetail}
          color='#d16ba5'
          />
      </div>
    </main>
  )
}
