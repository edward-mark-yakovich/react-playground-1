export const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export const initialState = {
  prevPath: '',
  prevSearch: '',
  currentPath: '',
  currentSearch: ''
};

export const routerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ROUTER_LOCATION_CHANGE:
      return {
        ...state,
        prevPath: state.currentPath,
        prevSearch: state.currentSearch,
        currentPath: action.payload.location.pathname,
        currentSearch: action.payload.location.search
      };
    default:
      return state;
  }
};

export default routerReducer;
