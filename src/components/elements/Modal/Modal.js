import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../../contexts';
import './styles.scoped.css';

export default function Modal(props) {
  const { content, setContent } = useContext(ModalContext);
  const { open, className, children, onClose } = props;
  const [modalContent, setModalContent] = useState(content);
  
  useEffect(() => {
    if (open) setContent(<Content children={children} className={className} />);
    else setContent(null);
  }, [open]);

  useEffect(() => {
    if (modalContent && !content) {
      onClose();
      setModalContent(content);
    } else {
      setModalContent(content);
    }
  }, [children]);

  return null;
}

Modal.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  open: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Content({ className, children }) {
  const customClass = ['modal-component', className].filter(Boolean).join(' ');
  return (
    <section className={customClass}>
      {children}
    </section>
  );
}

Content.defaultProps = {
  children: null,
  className: '',
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
