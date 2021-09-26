import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput } from '../Layout/TextInput'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { createBoard } from '../../actions/boards'

export const NewBoard = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createBoard({
      name
    }))
    setIsOpen(false)
    setName('')
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
                className="font-bold text-lg"
              >
                Add board title
              </Dialog.Title>

              {/* <Dialog.Description></Dialog.Description> */}

              <form onSubmit={handleSubmit}>
                <TextInput placeholder="Board title" value={name} onChange={handleChange} />

                <Button type="submit"
                  className="bg-blue-900">
                  Create board
                </Button>
                <Button type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-pink-900">
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
