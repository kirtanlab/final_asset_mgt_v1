const ClassificationReducer = (state, action) => {
    if (action.type === 'SET_ADDED_CLASSIFICATION') {
        console.log('SET_ADDED_CLASSIFICATION');
        return { ...state, addedFlag: action.payload };
    }
    return state;
};
export default ClassificationReducer;
