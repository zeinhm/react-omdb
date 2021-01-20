import React from 'react';
import PropTypes from 'prop-types';
import './styles.scoped.css';

export default function LoadingBars(props) {
  const { className, size } = props;
  const primaryColor = '#3498db';
  const remSize = `${size}rem`;
  const border = `${size/9}rem solid #f3f3f3`;
  const borderBottom = `${size/9}rem solid ${primaryColor}`;
  const borderRight = `${size/9}rem solid ${primaryColor}`;
  const borderTop = `${size/9}rem solid ${primaryColor}`;
  const customClass = ['loading-spinner', className].filter(Boolean).join(' ');
  return (
    <section className={customClass}>
      <div
        style={{
          border: border,
          borderBottom: borderBottom,
          borderRight: borderRight,
          borderTop: borderTop,
          height: remSize,
          width: remSize
        }}
      />
    </section>
  );
}

LoadingBars.defaultProps = {
  className: '',
  size: 4,
};

LoadingBars.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};
