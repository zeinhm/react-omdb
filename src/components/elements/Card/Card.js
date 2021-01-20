import React from 'react';
import PropTypes from 'prop-types';
import './styles.scoped.css';

export default function Card(props) {
  const { children, className } = props;
  const classes = ['card-component', className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {children}
    </section>
  );
}

Card.defaultProps = {
  children: null,
  className: '',
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
