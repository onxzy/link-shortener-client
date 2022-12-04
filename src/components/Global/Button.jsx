import React from 'react'

function Button(props) {
  return (
    <button {...{className: null, ...props}}
      // type={props.type} disabled={props.disabled} onClick={props.onClick}
      className={`
        ${props.className}
        px-3 py-2 inline-flex justify-center items-center
        ${props.outline ? "border border-red" : "bg-red"}
        rounded-md outline-none
        hover:bg-red-700
        focus:outline-red`}>
      {props.children}
    </button>
  )
}

export default Button
