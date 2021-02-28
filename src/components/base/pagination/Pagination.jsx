import './pagination.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.currentPage || 1
    };
  }

  handlePagination(dir) {
    const {page} = this.state;

    let updatedPage = page;

    dir === 'forward' ? ++updatedPage : --updatedPage;

    this.sendOffPage(updatedPage);
  }

  handlePaginationDirect(event) {
    const val = event.target.value;

    this.sendOffPage(parseInt(val) || 1);
  }

  sendOffPage(newPage) {
    const {handleChosenPage} = this.props;

    handleChosenPage(newPage);
    this.setState({page: newPage});

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

          <div className="pagination__counter">
            <label className="vh" htmlFor="pagination__input-ID-01">{page}</label>
            <input value={page} onChange={this.handlePaginationDirect.bind(this)} type="text" name="pagination__input-ID-01" id="pagination__input-ID-01" />
          </div>

          <button disabled={endOfPages} className="pagination__btn" onClick={this.handlePagination.bind(this, 'forward')}>
            Next
          </button>
        </div>
      </nav>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  endOfPages: PropTypes.bool,
  handleChosenPage: PropTypes.func
};

export default Pagination;
