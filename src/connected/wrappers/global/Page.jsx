import './main.scss';

import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Nav from '@components/base/nav/Nav.jsx';
import LoaderIcon from '@components/base/loader-icon/LoaderIcon.jsx';

export class Page extends Component {
  render() {
    const {
      nameId
    } = this.props;

    return (
      <div className="main">

        <LoaderIcon />

        <Nav
          nameId={nameId}
        />

        {this.props.children}

      </div>
    );
  }
}

Page.defaultProps = {
  match: '',
  nameId: ''
};

Page.propTypes = {
  children: PropTypes.any,
  match: PropTypes.object,
  nameId: PropTypes.string
};

export default Page;
