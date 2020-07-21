import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';

const Pagination = ({ pageCount, pageClick }) => {
  return (
    <ReactPaginate
      previousLabel={'prev'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={pageClick}
      containerClassName={classes.Pagination}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
