import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../contexts';

export default function PageBase({ children }) {
  const contextModal = useContext(ModalContext);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (contextModal?.content) {
      body.className = 'modal-open';
    }
    if(!contextModal?.content){
      body.className = '';
    }
  }, [contextModal?.content]);

  return (
    <>
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

