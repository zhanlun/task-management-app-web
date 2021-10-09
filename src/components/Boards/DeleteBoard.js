import { Fragment } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Modal } from '../Layout/Modal'
import boardsApi from '../../api/boards'
import { boardDeleted } from '../../reducers/boards'

export const DeleteBoard = ({ board, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    boardsApi.deleteBoard(board.id)
    dispatch(boardDeleted(board.id))
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
          <span
            data-cy="board-title-delete"
            className="font-bold text-black">
            {board.title}
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
