import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPosts,
  setPostCurrentPage
} from './postsReducer';
import Posts from './Posts.jsx';

export class PostsPage extends Component {
  render() {
    return (
      <Posts
        setPostCurrentPage={this.props.setPostCurrentPage}
        postCurrentPage={this.props.postCurrentPage}
        getPosts={this.props.getPosts}
        posts={this.props.posts}
        postsLoaded={this.props.postsLoaded}
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

PostsPage.propTypes = {
  currentPath: PropTypes.string,
  currentSearch: PropTypes.string,
  getPosts: PropTypes.func,
  location: PropTypes.object,
  match: PropTypes.object,
  postCurrentPage: PropTypes.number,
  posts: PropTypes.array,
  postsLoaded: PropTypes.bool,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string,
  setPostCurrentPage: PropTypes.func
};

function mapStateToProps(state) {
  return {
    postCurrentPage: state.postsReducer.postCurrentPage,
    posts: state.postsReducer.posts,
    postsLoaded: state.postsReducer.postsLoaded,
    prevPath: state.routerReducer.prevPath,
    prevSearch: state.routerReducer.prevSearch,
    currentPath: state.routerReducer.currentPath,
    currentSearch: state.routerReducer.currentSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: bindActionCreators(getPosts, dispatch),
    setPostCurrentPage: bindActionCreators(setPostCurrentPage, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsPage);
