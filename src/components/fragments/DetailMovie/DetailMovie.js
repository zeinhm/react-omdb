import React from 'react'
import { useSelector } from 'react-redux'
import { PropagateLoader } from "react-spinners";
import defaultImg from '../../../assets/default-poster.jpg'
import './styles.scoped.css'

export default function DetailMovie() {
  const { dataMovieDetail, isLoadingMovieDetail } = useSelector( state => state.movieDetail)
  const defaultPoster = (e) => {
    e.target.src = defaultImg
  }
  return (
    <>
     {(dataMovieDetail && !isLoadingMovieDetail) &&
        (
          <div className='container'>
            <div className='poster'>
              <img alt="Poster" src={dataMovieDetail.Poster} 
                onError={defaultPoster}/>
            </div>
            <div className='detail'>
              <h2>{dataMovieDetail.Title}</h2>
              <p>{dataMovieDetail.Plot}</p>
              <h3>{dataMovieDetail.Genre}</h3>
              <div className='more-info'>
                <div>
                  <span>Original Release:</span>
                  <h4>{dataMovieDetail.Released}</h4>
                </div>
                <div>
                  <span>Ratings:</span>
                  <h4>{dataMovieDetail.Ratings?.[0]?.Value}</h4>
                </div>
                <div>
                  <span>Runtime:</span>
                  <h4>{dataMovieDetail.Runtime}</h4>
                </div>
                <div>
                  <span>Box Office:</span>
                  <h4>{dataMovieDetail.BoxOffice}</h4>
                </div>
              </div>
              <div className='actors'>
                <h3>Actors:</h3>
                <span>{dataMovieDetail.Actors}</span>
              </div>
            </div>
          </div>
        )
      } 
      <div className='loading-wrapper'>
        <PropagateLoader
          loading={isLoadingMovieDetail}
          color='#d16ba5'
          />
        </div>
    </>
  )
}
