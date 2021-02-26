import './single-post.scss';
import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Page from '@connected/wrappers/global/Page.jsx';

export class SinglePost extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      getSinglePost,
      match: {params}
    } = this.props;

    getSinglePost(params.slug);
  }

  render() {
    const {
      match,
      post,
      postLoaded
    } = this.props;
    const content = post[0];

    return (
      <Page
        nameId="single-post"
        match={match}
      >
        <div className="page page--single-post">

          <div className="page__heading">
            <h1>Single Post</h1>
          </div>

          {!postLoaded
            ? <p>Fetching data...</p>
            : <div className="single-post">
                <h3
                  className="single-post__heading"
                  dangerouslySetInnerHTML={{
                      __html: content?.title?.rendered || ''
                  }}
                />

                <div
                  className="single-post__copy"
                  dangerouslySetInnerHTML={{
                      __html: content?.content?.rendered || ''
                  }}
                />
              </div>
          }

        </div>
      </Page>
    );
  }
}

SinglePost.propTypes = {
  currentPath: PropTypes.string,
  currentSearch: PropTypes.string,
  getSinglePost: PropTypes.func,
  location: PropTypes.object,
  match: PropTypes.object,
  post: PropTypes.array,
  postLoaded: PropTypes.bool,
  prevPath: PropTypes.string,
  prevSearch: PropTypes.string
};

export default SinglePost;
