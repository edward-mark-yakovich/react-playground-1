export const GET_POSTS = 'dm/GET_POSTS';
export const SET_POSTS = 'dm/SET_POSTS';
export const SET_POST_CURRENT_PAGE = 'dm/SET_POST_CURRENT_PAGE';

export const initialState = {
  posts: [],
  postsLoaded: false,
  postCurrentPage: 1
};

export const postsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_POSTS:
        return {
          ...state,
          postsLoaded: true,
          posts: action.posts
        };
      case SET_POST_CURRENT_PAGE:
        return {
          ...state,
          postCurrentPage: action.postCurrentPage
        };
      default:
        return state;
    }
};

export const getPosts = (params) => ({
  type: GET_POSTS,
  params
});

export const setPostCurrentPage = (postCurrentPage) => ({
  type: SET_POST_CURRENT_PAGE,
  postCurrentPage
});

export default postsReducer;
