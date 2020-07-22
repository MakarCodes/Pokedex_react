import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.scss';

const Pagination = ({ pageCount, pageClick }) => {
  return (
    <ReactPaginate
      previousLabel={'‹'}
      nextLabel={'›'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={pageClick}
      containerClassName={classes.Pagination}
      subContainerClassName={'pages pagination'}
      activeClassName={classes.Active}
    />
  );
};

export default Pagination;
