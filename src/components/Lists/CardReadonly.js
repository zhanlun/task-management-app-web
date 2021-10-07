import React from 'react'

export const CardReadonly = ({ card, index }) => {
  return (
    <div
      className={
        `
        p-2 pb-5 mb-3
        text-sm text-gray-600 tracking-wide
        select-none
        rounded
        bg-gray-50 shadow
        hover:bg-yellow-50
        flex justify-between
        `
      }
    >
      <p className="flex-grow">
        {card.content}
      </p>
    </div>
  )
}