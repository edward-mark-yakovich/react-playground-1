export const GET_HOME_INTRO = 'dm/GET_HOME_INTRO';
export const SET_HOME_INTRO = 'dm/SET_HOME_INTRO';
export const GET_HOME_CATEGORIES = 'dm/GET_HOME_CATEGORIES';
export const SET_HOME_CATEGORIES = 'dm/SET_HOME_CATEGORIES';

export const initialState = {
  intro: [],
  introLoaded: false,
  categories: [],
  categoriesLoaded: false
};

export const homeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_HOME_INTRO:
        return {
          ...state,
          introLoaded: true,
          intro: action.intro
        };
      case SET_HOME_CATEGORIES:
        return {
          ...state,
          categoriesLoaded: true,
          categories: action.categories
        };
      default:
        return state;
    }
};

export const getHomeIntro = (params) => ({
  type: GET_HOME_INTRO,
  params
});

export const getHomeCategories = (params) => ({
  type: GET_HOME_CATEGORIES,
  params
});

export default homeReducer;
