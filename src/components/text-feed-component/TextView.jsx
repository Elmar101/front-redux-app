import React from 'react'

export const TextView = (props) => {
    const {text} = props;
  return (
    <div className="card p-1">{text.content}</div>
  )
}
