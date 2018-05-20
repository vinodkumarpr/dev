import React from 'react'

const Link = ({ active, children, onClick }) => (
    <button
       onClick={onClick}
       disabled={active}
       style={{
           marginLeft: '4px',
       }}
       className="btn btn-primary"
    >
      {children}
    </button>
)


export default Link
