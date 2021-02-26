import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getSinglePost,
  resetSinglePost
} from './singlePostReducer';
import SinglePost from './SinglePost.jsx';

export class SinglePostPage extends Component {
  componentWillUnmount() {
    this.props.resetSinglePost();
  }

  render() {
    return (
      <SinglePost
        getSinglePost={this.props.getSinglePost}
        post={this.props.post}
        postLoaded={this.props.postLoaded}
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

SinglePostPage.propTypes = {
  currentPath: PropTypes.string,
  currentSearch: PropTypes.string,
  getSinglePost: PropTypes.func,
  location: PropTypes.object,
  match: PropTypes.object,
  post: PropTypes.array,
  postLoaded: PropTypes.bool,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string,
  resetSinglePost: PropTypes.func
};

function mapStateToProps(state) {
  return {
    post: state.singlePostReducer.post,
    postLoaded: state.singlePostReducer.postLoaded,
    prevPath: state.routerReducer.prevPath,
    prevSearch: state.routerReducer.prevSearch,
    currentPath: state.routerReducer.currentPath,
    currentSearch: state.routerReducer.currentSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSinglePost: bindActionCreators(getSinglePost, dispatch),
    resetSinglePost: bindActionCreators(resetSinglePost, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostPage);
