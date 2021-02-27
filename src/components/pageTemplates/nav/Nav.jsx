import './nav.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  goTo
} from '@utils/helpers';

export class Nav extends Component {
  render() {
    const {
      nameId
    } = this.props;
    const isLocal = window.location.host === 'localhost:8080';
    const subPath = isLocal ? '' : window.config.subDir;

    return (
      <nav className="nav">
        <ul>
          <li className={`${nameId === 'home' ? '_acitve' : ''}`}><button onClick={goTo.bind(this, `${subPath}/`)}>Home</button></li>
          <li className={`${nameId === 'posts' ? '_acitve' : ''}`}><button onClick={goTo.bind(this, `${subPath}/posts`)}>Posts</button></li>

          {nameId === 'single-post' &&
            <li className="_acitve"><button>Single Post</button></li>
          }
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  nameId: PropTypes.string
};

export default Nav;
