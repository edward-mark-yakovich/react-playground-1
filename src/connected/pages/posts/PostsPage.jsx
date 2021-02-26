import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPosts
} from './postsReducer';
import Posts from './Posts.jsx';

export class PostsPage extends Component {
  render() {
    return (
      <Posts
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
  posts: PropTypes.array,
  postsLoaded: PropTypes.bool,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string
};

function mapStateToProps(state) {
  return {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsPage);
