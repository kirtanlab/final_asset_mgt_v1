const LocationReducer = (state, action) => {
  if (action.type === 'SET_ADDED_LOCATION') {
    // console.log('SET_ADDED_CATEGORY');
    return { ...state, addedFlag: action.payload };
  }
  return state;
};
export default LocationReducer;
