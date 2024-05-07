import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import LocationReducer from 'src/reducer/LocationReducer';

const initialState = {
  addedFlag: false,
};

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LocationReducer, initialState);

  const contextValue = useMemo(() => {
    const setAddedFlag = (val) => {
      dispatch({ type: 'SET_ADDED_LOCATION', payload: val });
    };

    return { ...state, setAddedFlag };
  }, [state]);

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};

export const useLocationContext = () => useContext(LocationContext);

LocationProvider.propTypes = {
  children: PropTypes.element,
};
