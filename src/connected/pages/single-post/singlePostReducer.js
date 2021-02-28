export const GET_SINGLE_POST = 'dm/GET_SINGLE_POST';
export const SET_SINGLE_POST = 'dm/SET_SINGLE_POST';
export const RESET_SINGLE_POST = 'dm/RESET_SINGLE_POST';

export const initialState = {
  post: [],
  postLoaded: false
};

export const singlePostReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_SINGLE_POST:
        return {
          ...state,
          postLoaded: true,
          post: action.post
        };
      case RESET_SINGLE_POST:
        return {
          ...state,
          postLoaded: false,
          post: []
        };
      default:
        return state;
    }
};

export const getSinglePost = (params) => ({
  type: GET_SINGLE_POST,
  params
});

export const resetSinglePost = () => ({
  type: RESET_SINGLE_POST
});

export default singlePostReducer;
