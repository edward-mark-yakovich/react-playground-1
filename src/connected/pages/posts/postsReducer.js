export const GET_POSTS = 'dm/GET_POSTS';
export const SET_POSTS = 'dm/SET_POSTS';

export const initialState = {
  posts: [],
  postsLoaded: false
};

export const postsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_POSTS:
        return {
          ...state,
          postsLoaded: true,
          posts: action.posts
        };
      default:
        return state;
    }
};

export const getPosts = (params, loaderConfig) => ({
  type: GET_POSTS,
  params,
  loaderConfig
});

export default postsReducer;
