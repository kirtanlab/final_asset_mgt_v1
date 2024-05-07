import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import ClassificationReducer from 'src/reducer/ClassificationReducer';

const initialState = {
    addedFlag: false,
};

const ClassificationContext = React.createContext();

export const ClassficationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassificationReducer, initialState);

    const contextValue = useMemo(() => {
        const setAddedFlag = (val) => {
            dispatch({ type: 'SET_ADDED_CLASSIFICATION', payload: val });
        };

        return { ...state, setAddedFlag };
    }, [state]);

    return <ClassificationContext.Provider value={contextValue}>{children}</ClassificationContext.Provider>;
};

export const useClassificationContext = () => useContext(ClassificationContext);

ClassficationProvider.propTypes = {
    children: PropTypes.element,
};
