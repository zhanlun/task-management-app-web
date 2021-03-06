import React from 'react'

export const TextInput = ({ placeholder, ...props }) => {
  return (
    <input {...props} type="text" placeholder={placeholder}
      className="my-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-500" />
  )
}
