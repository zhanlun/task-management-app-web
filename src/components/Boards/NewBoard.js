import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput } from '../Layout/TextInput'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { createBoard, updateBoard } from '../../actions/boards'

export const NewBoard = ({ board, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) return

    if (!board) {
      dispatch(createBoard({
        name
      }))
    } else {
      dispatch(updateBoard(board.id, {
        name
      }))
    }
    setIsOpen(false)
    setName('')
  }

  useEffect(() => {
    if (board) {
      setName(board.name)
    }
  }, [])

  return (
    <Transition appear show={isOpen} as={Fragment}>

      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
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
                {
                  board ?
                    'Edit board title' :
                    'Add board title'
                }
              </Dialog.Title>

              {/* <Dialog.Description></Dialog.Description> */}

              <form onSubmit={handleSubmit}>
                <TextInput placeholder="Board title" value={name} onChange={handleChange} />

                <Button type="submit"
                  className="bg-indigo-500">
                  {
                    board ?
                      'Update board' :
                      'Create board'
                  }
                </Button>
                <Button type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-pink-500">
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
