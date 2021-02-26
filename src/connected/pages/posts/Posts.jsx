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
        page: 1,
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
    const {getPosts} = this.props;
    const {postConfig} = this.state;

    let updatedPostConfig = {
      ...postConfig,
      page: newPage
    };

    getPosts(updatedPostConfig);
  }

  render() {
    const {
      match,
      posts,
      postsLoaded
    } = this.props;
    const {postConfig} = this.state;

    return (
      <Page
        nameId="posts"
        match={match}
      >
        <div className="page page--posts">

          <div className="page__heading">
            <h1>Posts</h1>
          </div>

          {!postsLoaded
            ? <p>Fetching data...</p>
            : <div className="post-listing">
                <div className="post-listing__btns grid">
                  {_.map(posts, (post, index) => {
                    return (
                      <button className="post-btn" key={index} onClick={this.handleGoToPost.bind(this, post.slug)}>
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
                  handleChosenPage={this.goToPostPage.bind(this)}
                  endOfPages={_.isEmpty(posts) || postConfig.perPage > posts.length}
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
  posts: PropTypes.array,
  postsLoaded: PropTypes.bool,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string
};

export default Posts;