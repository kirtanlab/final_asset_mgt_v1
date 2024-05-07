import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import EmployeeReducer from 'src/reducer/EmployeeReducer';

const initialState = {
    addedFlag: false,
};

const EmployeeContext = React.createContext();

export const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);

    const contextValue = useMemo(() => {
        const setAddedFlag = (val) => {
            dispatch({ type: 'SET_ADDED_CATEGORY', payload: val });
        };

        return { ...state, setAddedFlag };
    }, [state]);

    return <EmployeeContext.Provider value={contextValue}>{children}</EmployeeContext.Provider>;
};

export const useEmployeeContext = () => useContext(EmployeeContext);

EmployeeProvider.propTypes = {
    children: PropTypes.element,
};
