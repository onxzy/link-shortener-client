import React from 'react'

function Input(props) {
  return (
    <input {...{className: null, ...props}}
      className={`
        ${props.className} 
        px-3 py-2
        font-mono
        bg-dark-700 border border-dark-500 rounded-md placeholder-dark-300 outline-none
        focus:outline-red-
        ${props.error && "border-orange-300"}
        `}
        />
      
  )
}

export default Input
