import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PageChangeButton({prevPage,nextPage,page,totalPages}) {
  return (
    <Pagination className="page-change">
      <Pagination.Prev onClick={prevPage} disabled={page === 1}>
        Previous
      </Pagination.Prev>
      <Pagination.Item disabled>
        Page {page} of {totalPages}
      </Pagination.Item>
      <Pagination.Next onClick={nextPage} disabled={page === totalPages}>
        Next
      </Pagination.Next>
    </Pagination>
  )
}