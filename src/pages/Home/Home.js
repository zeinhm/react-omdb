import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { PropagateLoader } from "react-spinners";
import queryString from 'querystring'
import alertIcon from '../../assets/ic-alert.svg'
import Alert from '../../components/elements/Alert';
import MovieList from '../../components/fragments/MovieList'
import Search from '../../components/fragments/Search'
import Navbar from '../../components/fragments/Navbar'
import { failedAction, getAutoComplete, getMovies, getShownMovies, successAction } from '../../modules/Home/actions'

import './styles.scoped.css'

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { search = '' } = queryString.parse(location.search.replace('?', ''));
  const [alert, setAlert] = useState(false);
  const [autoCompleteList, setAutoCompleteList] = useState([])
  const [isBottom, setIsBottom] = useState(false);
  const [keyword, setKeyword] = useState('')
  const limit = 5, offset = 0
  const { dataAutoComplete, dataPage, dataShownMovies, dataStoreMovies,
    isLoadingGetMovies, messageGetMovies } = useSelector(state => state.home)
  
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
    if (search && keyword) dispatch(getAutoComplete({ page: 1, search }))
  }, [search, keyword])

  useEffect(() => {
    if (dataAutoComplete) {
      setAutoCompleteList(dataAutoComplete)
    } else {
      setAutoCompleteList([])
    }
  }, [dataAutoComplete])

  useEffect(() => {
    if (messageGetMovies) {
      setAlert(true);
    }
  }, [messageGetMovies]);

  useEffect(() => {
    if (!alert) dispatch(failedAction('', 'GetMovies'));
  }, [alert]);

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
    const newQuery = queryString.stringify({ search: value });
    if(value.trim() !== '') history.push(`?${newQuery}`);
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
          />
        <div className='loading-wrapper'>
          <PropagateLoader
            color='#69bff8'
            loading={isLoadingGetMovies}
            />
        </div>
      </section>
      <AlertError 
        message={messageGetMovies}
        onClose={setAlert}
        open={alert}
        />
    </main>
  );
}

export const AlertError = ({ message, onClose, open }) => {
  return(
    <Alert onClose={()=>onClose(false)} open={open}>
      <div className={`alert-error`}>
        <img alt="Warning" src={alertIcon}/>
        <p>{message}</p>
      </div>
    </Alert>
  );
};

AlertError.defaultProps = {
  message: '',
  onClose: () => {},
  open: false,
};

AlertError.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};