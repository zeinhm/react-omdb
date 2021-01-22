import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { AlertContext, ModalContext } from '../../contexts';

export default function PageBase({ children }) {
  const dispatch = useDispatch()
  const contextModal = useContext(ModalContext);
  const contextAlert = useContext(AlertContext);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (contextModal?.content) {
      body.className = 'modal-open';
    }
    if (contextAlert?.alert) {
      body.className = 'alert-open';
      setTimeout(()=>{contextAlert?.setAlert(null); dispatch({ type: 'Home/failed', message: '' }); }, 2500);
    }
    if(!contextAlert?.alert && !contextModal?.content){
      body.className = '';
    }
  }, [contextAlert, contextModal]);

  return (
    <>
      <div className="alert">{contextAlert?.alert}</div>
      {children}
      <div className="modal">{contextModal?.content}</div>
    </>
  );
}

PageBase.defaultProps = {
  children: null,
};

PageBase.propTypes = {
  children: PropTypes.node,
};

