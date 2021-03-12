import './posts.scss';
import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Page from '@connected/wrappers/global/Page.jsx';
import Pagination from '@components/base/pagination/Pagination.jsx';
import {
  goTo
} from '@utils/helpers';

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postConfig: {
        page: props.postCurrentPage,
        perPage: 20
      }
    };
  }

  componentDidMount() {
    const {getPosts} = this.props;
    const {postConfig} = this.state;

    getPosts(postConfig);
  }

  handleGoToPost(slug) {
    const isLocal = window.location.host === 'localhost:8080';
    const subPath = isLocal ? '' : window.config.subDir;

    goTo(`${subPath}/posts/${slug}`);
  }

  goToPostPage(newPage) {
    const {
      getPosts,
      setPostCurrentPage
    } = this.props;
    const {postConfig} = this.state;

    let updatedPostConfig = {
      ...postConfig,
      page: newPage
    };

    getPosts(updatedPostConfig);
    setPostCurrentPage(newPage);
  }

  render() {
    const {
      match,
      posts,
      postsLoaded,
      postCurrentPage
    } = this.props;
    const {postConfig} = this.state;
    const noPostsAvailable = postsLoaded && _.isEmpty(posts);

    return (
      <Page
        nameId="posts"
        match={match}
      >
        <div className="page page--posts">

          <div className="page__heading">
            <h1>Posts</h1>
          </div>

          {noPostsAvailable &&
            <p>No posts available...</p>
          }

          {!postsLoaded
            ? <p>Fetching data...</p>
            : <div className="post-listing">
                <div className="post-listing__btns grid">
                  {_.map(posts, (post) => {
                    return (
                      <button className="post-btn" key={post.id} onClick={this.handleGoToPost.bind(this, post.slug)}>
                        <div className="post-btn__img">
                          <img src={post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                        </div>

                        <h3
                          className="post-btn__heading"
                          dangerouslySetInnerHTML={{
                              __html: post?.title?.rendered || ''
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                <Pagination
                  currentPage={postCurrentPage}
                  handleChosenPage={this.goToPostPage.bind(this)}
                  endOfPages={noPostsAvailable || postConfig.perPage > posts.length}
                />
              </div>
          }

        </div>
      </Page>
    );
  }
}

Posts.propTypes = {
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

export default Posts;
