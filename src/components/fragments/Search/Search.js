import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './styles.scoped.css'

export default function Search(props) {
  const history = useHistory()
  const { list, keyword, onChange, onClick, onSubmit } = props

  const [activeOption, setActiveOption] = useState(false)
  const [chosenOption, setChosenOption] = useState('')
  const [options, setOptions] = useState([])
  
  const state = useSelector(state => state.home)
  
  useEffect(() => {
    if (list && keyword) setOptions(list)
  }, [list])

  useEffect(() => {
    if (!keyword) setOptions([])
  }, [keyword])

  useEffect(() => {
    if (chosenOption) history.push(`/detail/?id=${chosenOption}`)
  },[chosenOption])

  const onClickSearch = () => {
    setOptions([])
    onClick()
  }
  const onClickOption = id => {
    setOptions([])
    setChosenOption(id)
  }
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      if (activeOption === false) {
        setOptions([])
        onSubmit()
      } else if(activeOption === 5) {
        setOptions([])
        onClickSearch()
      } else {
        setActiveOption(false)
        setOptions([])
        setChosenOption(options[activeOption].imdbID)
      }
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        setActiveOption(false)
      } else {
        setActiveOption(activeOption - 1)
      }
    } else if (e.keyCode === 40) {
      if (activeOption === false) {
        setActiveOption(0)
      } else {
        if (activeOption === options.length - 1) {
          return;
        }
        setActiveOption(activeOption +1 )
      }
    } else if (e.keyCode === 27) {
      setActiveOption(false)
      setOptions([])
    }
  }

  const optionList = () => {
    return (
      <ul className="options">
        {options?.length >= 1 && options.map((i, idx) => {
          let className = ''
          if (idx === activeOption) {
            className = 'active'
          }
          if (idx < 5) {
            return <li className={className} key={idx} onClick={() => onClickOption(i.imdbID)}>{i.Title}</li>
          }
        })}
        {!state.messageAutoComplete && options.length > 5 && <li className={activeOption === 5 ? 'active' :''} onClick={() => onClickSearch()}>... <span>&#x2192;</span></li>}
        {(state.messageAutoComplete && keyword.trim() !== '' && !state.isLoadingGetMovies) && (
          <li className='error'>{state.messageAutoComplete}</li>
        )}
      </ul>
    )
  }
  
  return (
    <div className='search-box'>
        <input className='search-input' onChange={e=>onChange(e.target)} onKeyDown={(e)=> onKeyDown(e)}
          placeholder='Search...' type="text" value={keyword}  />
        <input className={`search-btn ${state?.isLoadingAutoComplete ? 'spinner-active' : 'spinner-inactive'}`}
          onClick={()=>onClickSearch()}  type="submit"/>    
      {optionList()}
    </div>
  )
}

Search.defaultProps = {
  list: [],
  keyword: '',
  onChange: () => {},
  onClick: () => {},
  onSubmit: () => {}
}

Search.propTypes = {
  list: PropTypes.array,
  keyword: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func
}
