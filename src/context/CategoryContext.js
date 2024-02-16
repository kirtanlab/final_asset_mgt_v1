import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import CategoryReducer from 'src/reducer/CategoryReducer';

const initialState = {
  addedFlag: false,
};

const CategoryContext = React.createContext();

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const contextValue = useMemo(() => {
    const setAddedFlag = (val) => {
      dispatch({ type: 'SET_ADDED_CATEGORY', payload: val });
    };

    return { ...state, setAddedFlag };
  }, [state]);

  return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

export const useCategoryContext = () => useContext(CategoryContext);

CategoryProvider.propTypes = {
  children: PropTypes.element,
};
