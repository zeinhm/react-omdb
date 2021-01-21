import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
import Card from '../../elements/Card'
import Modal from '../../elements/Modal'
import defaultImg from '../../../assets/default-poster.jpg'
import './styles.scoped.css'

export default function MovieList(props) {
  const history = useHistory()
  const { dataShownMovies } = props
  const [openModal, setOpenModal] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const defaultPoster = (e) => {
    e.target.src = defaultImg
  }
  const onClick = id => {
    history.push(`detail/?id=${id}`)
  }
  const onClickImg = imgSrc => {
    setImgSrc(imgSrc)
    setOpenModal(true)
  }
  const onCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <ul>
        {
          dataShownMovies.length >= 1 && dataShownMovies.map((data, key) => (
            <li key={key}>
              <Card className='card-movie'>
                <figure>
                  <img
                    alt="Poster"
                    onClick={()=> onClickImg(data.Poster)}
                    onError={defaultPoster}
                    src={data.Poster}
                    />
                  <figcaption>{data.Title}</figcaption>
                  <button onClick={() => onClick(data.imdbID)}>Detail</button>
                </figure>
              </Card>
            </li>
          )) 
        }
      </ul>
      <ModalPoster
        defaultPoster={defaultPoster}
        imgSrc={imgSrc}
        onClose={()=>onCloseModal(false)}
        open={openModal}
        />
    </div>
  )
}

MovieList.defaultProps = {
  dataShownMovies: []
}

MovieList.propTypes = {
  dataShownMovies: PropTypes.array
}

export function ModalPoster({ defaultPoster, open, onClose, imgSrc }) {
  return (
    <Modal className='modal-poster' open={open}>
      <img
        alt="Poster"
        onError={defaultPoster}
        src={imgSrc}
        />
      <button onClick={() => onClose()}>Close</button>
    </Modal>
  );
}

ModalPoster.defaultProps = {
  defaultPoster: () => { },
  onClose: () => { },
  open: false,
};

ModalPoster.propTypes = {
  defaultPoster: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};