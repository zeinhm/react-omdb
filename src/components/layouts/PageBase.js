import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../contexts';

export default function PageBase({ children }) {
  const { content, setContent } = useContext(ModalContext);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (content) {
      body.className = 'modal-open';
    }
    if(!content){
      body.className = '';
    }
  }, [content]);

  return (
    <>
      {children}
      <div className="modal">{content}</div>
    </>
  );
}

PageBase.defaultProps = {
  children: null,
};

PageBase.propTypes = {
  children: PropTypes.node,
};

