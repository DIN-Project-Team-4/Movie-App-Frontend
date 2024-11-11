import React from 'react'

export default function PageChangeButton({prevPage,nextPage,page,totalPages}) {
    
  return (
    <div className='pageButtons' style={{ display: totalPages > 0 ? 'flex' : 'none', alignItems: 'center', gap: '10px' }}>
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <span> Page {page} </span>
        <button onClick={nextPage} disabled={page === totalPages}>Next</button>
    </div>
  )
}
