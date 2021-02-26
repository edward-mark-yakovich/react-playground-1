import "./home.scss";
import _ from "lodash";
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Page from "@connected/wrappers/global/Page.jsx";

export class Home extends Component {
  componentDidMount() {
    const {
      getHomeIntro,
      getHomeCategories
    } = this.props;

    getHomeIntro();
    getHomeCategories();
  }

  render() {
    const {
      match,
      categories,
      categoriesLoaded,
      intro,
      introLoaded
    } = this.props;
    const content = intro[0];

    return (
      <Page
        nameId="home"
        match={match}
      >
        <div className="page page--home">

          <div className="page__heading">
            <h1>Home</h1>
          </div>

          {!introLoaded
            ? <p>Fetching data...</p>
            : <div className="home-intro">
                <div className="grid">
                  <div className="home-intro__img">
                    <img src={content?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                  </div>

                  <div className="home-intro__content">
                    <h3
                      className="home-intro__heading"
                      dangerouslySetInnerHTML={{
                          __html: content?.title?.rendered || ''
                      }}
                    />

                    <div
                      className="home-intro__copy"
                      dangerouslySetInnerHTML={{
                          __html: content?.excerpt?.rendered || ''
                      }}
                    />
                  </div>
                </div>
              </div>
          }

          {!categoriesLoaded
            ? <p>Fetching data...</p>
            : <div className="home-categories">
                <h3>Categories</h3>

                <ul>
                  {_.map(categories, (category, index) => {
                    return (
                      <li key={index}>{category?.name || ''}</li>
                    );
                  })}
                </ul>
              </div>
          }

        </div>
      </Page>
    );
  }
}

Home.propTypes = {
  categories: PropTypes.array,
  categoriesLoaded: PropTypes.bool,
  getHomeCategories: PropTypes.func,
  getHomeIntro: PropTypes.func,
  intro: PropTypes.array,
  introLoaded: PropTypes.bool,
  match: PropTypes.object,
};

export default Home;
