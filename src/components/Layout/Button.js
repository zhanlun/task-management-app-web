import React from 'react'

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={"px-2 py-1 m-2 rounded bg-opacity-90 text-white font-semibold text-sm md:text-base hover:bg-opacity-100 " + className}
    >
      {children}
    </button>
  )
}
