import './pagination.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  handlePagination(dir) {
    const {handleChosenPage} = this.props;
    const {page} = this.state;

    let updatedPage = page;

    dir === 'forward' ? ++updatedPage : --updatedPage;

    handleChosenPage(updatedPage);
    this.setState({page: updatedPage});

    window.scrollTo(0, 0);
  }

  render() {
    const {endOfPages} = this.props;
    const {
      page
    } = this.state;

    return (
      <nav className="pagination">
        <div className="grid">
          <button disabled={page == 1} className="pagination__btn" onClick={this.handlePagination.bind(this, 'previous')}>
            Previous
          </button>

          <div className="pagination__counter">{page}</div>

          <button disabled={endOfPages} className="pagination__btn" onClick={this.handlePagination.bind(this, 'forward')}>
            Next
          </button>
        </div>
      </nav>
    );
  }
}

Pagination.propTypes = {
  endOfPages: PropTypes.bool,
  handleChosenPage: PropTypes.func
};

export default Pagination;
