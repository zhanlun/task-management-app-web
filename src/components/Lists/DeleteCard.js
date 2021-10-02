import { Dialog } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import cardListsApi from '../../api/cardLists'
import cardsApi from '../../api/cards'
import { cardListUpdated } from '../../reducers/cardLists'
import { cardDeleted } from '../../reducers/cards'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'

export const DeleteCard = ({ card, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const cardList = useSelector(state => state.cardLists[card.card_list_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCardOrder = cardList.card_ids_order.filter(s => s !== card.id)
    const updatedCardList = {
      ...cardList,
      card_ids_order: newCardOrder,
    }
    cardListsApi.updateCardList(cardList.id, updatedCardList)
    dispatch(cardListUpdated(updatedCardList))
    cardsApi.deleteCard(card.id)
    dispatch(cardDeleted(card.id))
  }

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          <ExclamationCircleIcon className="w-6 h-6" />
          Delete a card
        </Dialog.Title>

        <Dialog.Description className="text-gray-800 my-2">
          Are you sure that you want to delete this card&nbsp;
          <span className="font-bold text-black">
            "{card.content.substring(0, 20)}
            {card.content.length > 20 && '...'}"&nbsp;
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
