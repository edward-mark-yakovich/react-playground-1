import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getHomeIntro,
  getHomeCategories
} from './homeReducer';
import {
  setPostCurrentPage
} from '@connected/pages/posts/postsReducer';
import Home from './Home.jsx';

export class HomePage extends Component {
  render() {
    return (
      <Home
        setPostCurrentPage={this.props.setPostCurrentPage}
        postCurrentPage={this.props.postCurrentPage}
        getHomeIntro={this.props.getHomeIntro}
        getHomeCategories={this.props.getHomeCategories}
        categories={this.props.categories}
        categoriesLoaded={this.props.categoriesLoaded}
        intro={this.props.intro}
        introLoaded={this.props.introLoaded}
        location={this.props.location}
        match={this.props.match}
        prevPath={this.props.prevPath}
        prevSearch={this.props.prevSearch}
        currentPath={this.props.currentPath}
        currentSearch={this.props.currentSearch}
      />
    );
  }
}

HomePage.propTypes = {
  categories: PropTypes.array,
  categoriesLoaded: PropTypes.bool,
  currentPath: PropTypes.string,
  currentSearch: PropTypes.string,
  getHomeCategories: PropTypes.func,
  getHomeIntro: PropTypes.func,
  intro: PropTypes.array,
  introLoaded: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object,
  postCurrentPage: PropTypes.number,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string,
  setPostCurrentPage: PropTypes.func
};

function mapStateToProps(state) {
  return {
    intro: state.homeReducer.intro,
    introLoaded: state.homeReducer.introLoaded,
    categories: state.homeReducer.categories,
    categoriesLoaded: state.homeReducer.categoriesLoaded,
    prevPath: state.routerReducer.prevPath,
    prevSearch: state.routerReducer.prevSearch,
    currentPath: state.routerReducer.currentPath,
    currentSearch: state.routerReducer.currentSearch,
    postCurrentPage: state.postsReducer.postCurrentPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHomeIntro: bindActionCreators(getHomeIntro, dispatch),
    getHomeCategories: bindActionCreators(getHomeCategories, dispatch),
    setPostCurrentPage: bindActionCreators(setPostCurrentPage, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
