import { Dialog } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateCardListIdOrder } from '../../actions/boards'
import { deleteCardList } from '../../actions/cardLists'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'

export const DeleteCardList = ({ cardList, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.id === cardList.board_id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCardListOrder = board.card_list_ids_order.filter(s => s !== cardList.id)
    await dispatch(updateCardListIdOrder(board, newCardListOrder))
    await dispatch(deleteCardList(cardList.id))
  }

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          <ExclamationCircleIcon className="w-6 h-6" />
          Delete a list
        </Dialog.Title>

        <Dialog.Description className="text-gray-800 my-2">
          Are you sure that you want to delete this list titled&nbsp;
          <span className="font-bold text-black">
            {cardList.title}
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
