import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AlertContext } from '../../../contexts';
import './styles.scoped.css';

export default function Alert(props) {
  const { alert, setAlert } = useContext(AlertContext);
  const { open, className, children, onClose } = props;

  useEffect(() => {
    if (open) setAlert(<Content children={children} className={className} />);
    else setAlert(null);
  }, [open]);

  const [alertContent, setAlertContent] = useState(alert);

  useEffect(() => {
    if (alertContent && !alert) {
      onClose();
      setAlertContent(alert);
    } else if (!alertContent && alert) {
      setAlertContent(alert);
    }
  });

  return null;
}

Alert.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  open: false,
};

alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Content({ className, children }) {
  const customClass = ['alert-component', className].filter(Boolean).join(' ');

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
