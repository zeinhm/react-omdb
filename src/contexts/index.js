import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext(null);
export const ModalContext = React.createContext(null);

export default function AppContextProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [content, setContent] = useState(null);
  const appValue = {
    breadcrumbs,
    setBreadcrumbs,
  };

  const modalValue = {
    content,
    setContent,
  };

  return (
    <AppContext.Provider value={appValue}>
      <ModalContext.Provider value={modalValue}>
        {children}
      </ModalContext.Provider>
    </AppContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
