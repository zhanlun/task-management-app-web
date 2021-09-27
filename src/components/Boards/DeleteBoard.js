import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput } from '../Layout/TextInput'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { createBoard, deleteBoard } from '../../actions/boards'
import { Board } from './Board'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

export const DeleteBoard = ({ board, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteBoard(board.id))
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        // open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded mx-auto w-4/5 max-w-lg p-6 -mt-20">
              <Dialog.Title
                className="font-bold text-lg flex gap-1 items-center"
              >
                <ExclamationCircleIcon className="w-6 h-6" />
                Delete board
              </Dialog.Title>

              <Dialog.Description className="text-gray-800 my-2">
                Are you sure that you want to delete this board titled&nbsp;
                <span className="font-bold text-black">
                  {board.name}
                </span>
                ?
              </Dialog.Description>

              <form onSubmit={handleSubmit}>
                <Button type="submit"
                  className="bg-indigo-500">
                  Confirm
                </Button>
                <Button type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-500">
                  Cancel
                </Button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
