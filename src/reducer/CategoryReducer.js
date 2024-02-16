const CategoryReducer = (state, action) => {
  if (action.type === 'SET_ADDED_CATEGORY') {
    console.log('SET_ADDED_CATEGORY');
    return { ...state, addedFlag: action.payload };
  }
  return state;
};
export default CategoryReducer;
