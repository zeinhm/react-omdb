import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { PropagateLoader } from "react-spinners";
import queryString from 'querystring'
import MovieList from '../../components/fragments/MovieList'
import Search from '../../components/fragments/Search'
import Navbar from '../../components/fragments/Navbar'
import { getAutoComplete, getMovies, getShownMovies, successAction } from '../../modules/Home/actions'

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { search = '' } = queryString.parse(location.search.replace('?', ''));
  const [autoCompleteList, setAutoCompleteList] = useState([])
  const [isBottom, setIsBottom] = useState(false);
  const [keyword, setKeyword] = useState('')
  const limit = 5, offset = 0
  const { dataAutoComplete, dataPage, dataShownMovies,
    dataStoreMovies, isLoadingGetMovies } = useSelector(state => state.home)
  
  function handleScroll() {
    const scrollTop = (document.documentElement
      && document.documentElement.scrollTop)
      || document.body.scrollTop;
    const scrollHeight = (document.documentElement
      && document.documentElement.scrollHeight)
      || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 10 >= scrollHeight){
        setIsBottom(true);
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      addItems();
    }
  }, [isBottom]);

  useEffect(() => {
    if (search && keyword) {
      dispatch(getAutoComplete({ page: 1, search }))
    } else {
      setAutoCompleteList([])
      history.push('/')
    }
  }, [search, keyword])

  useEffect(() => {
    if (dataAutoComplete) {
      setAutoCompleteList(dataAutoComplete)
    } else {
      setAutoCompleteList([])
    }
  }, [dataAutoComplete])

  const addItems = () => {
    if (dataStoreMovies.length === dataShownMovies.length) {
      const payload = {
        search,
        page: dataPage + 1
      }
      dispatch(getMovies(payload, offset, limit))
    } else {
      dispatch(getShownMovies(dataStoreMovies))
    }
    setIsBottom(false)
  };

  const onChange = ({ value }) => {
    setKeyword(value)  
    const newQuery = queryString.stringify({ page: 1, search: value });
    history.push(`?${newQuery}`);
  }

  const onClick = () => {
    const payload = { search, page: 1}
    dispatch(getMovies(payload, offset, limit))
  }

  const onSubmit = () => {
    const payload = {
      search,
      page: 1
    }
    setAutoCompleteList([])
    dispatch(successAction([], 'StoreMovies'))
    dispatch(getMovies(payload, offset, limit))
  }

  return (
    <main className='home-page'>
      <Navbar/>
      <section>
        <Search
          className='search'
          keyword={keyword}
          list={autoCompleteList}
          onChange={onChange}
          onClick={onClick}
          onSubmit={onSubmit}
          />
        <MovieList
          dataShownMovies={dataShownMovies}
          onClick={onClick}
          />
        <div className='loading-wrapper'>
          <PropagateLoader
            color='#69bff8'
            loading={isLoadingGetMovies}
            />
        </div>
      </section>
    </main>
  );
}
