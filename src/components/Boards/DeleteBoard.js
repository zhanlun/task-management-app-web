import { Fragment } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { deleteBoard } from '../../actions/boards'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Modal } from '../Layout/Modal'

export const DeleteBoard = ({ board, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteBoard(board.id))
  }

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
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
      </Fragment>
    </Modal>
  )
}
