import React from 'react'

const XSippiner = ({textColor}) => {
  return (
    <div className="d-flex justify-content-center">
        <div className={`spinner-border ${textColor ? textColor : "text-black-50"}`}>
          <span className="sr-only"></span>
        </div>
    </div>
  )
}

export default XSippiner