import React, { useEffect } from 'react';
import queryString from 'querystring'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getMovieDetail } from '../../modules/MovieDetail/actions'
import DetailMovie from '../../components/fragments/DetailMovie'
import Navbar from '../../components/fragments/Navbar'
import './styles.scoped.css'

export default function MovieDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { id } = queryString.parse(location.search.replace('?', ''));

  useEffect(() => {
    if(id) dispatch(getMovieDetail(id))
  },[id])

  return (
    <main className='detail-page'>
      <Navbar/>
      <section>
        <DetailMovie/>
        <a href="http://www.omdbapi.com/" target="_blank">Powered by OMDb API</a>
      </section>
    </main>
  );
}
