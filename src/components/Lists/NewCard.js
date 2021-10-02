import { Dialog } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cardListsApi from '../../api/cardLists'
import cardsApi from '../../api/cards'
import { cardListUpdated } from '../../reducers/cardLists'
import { cardCreated, cardUpdated } from '../../reducers/cards'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'
import { TextInput } from '../Layout/TextInput'

export const NewCard = ({ card, cardList, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const cardListId = card ? card.card_list_id : cardList.id
  cardList = useSelector(state => state.cardLists[cardListId])

  const [content, setContent] = useState(card ? card.content : '')
  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsOpen(false)
    setContent('')
    if (card) {
      const updatedCard = {
        ...card,
        content,
      }
      cardsApi.updateCard(card.id, updatedCard)
      dispatch(cardUpdated(updatedCard))
    } else {
      const newCard = {
        content,
      }
      const { data } = await cardsApi.createCardByCardListId(cardList.id, newCard)
      const { data: updatedCardList } = await cardListsApi.getCardListById(cardList.id)
      dispatch(cardCreated(data))
      dispatch(cardListUpdated(updatedCardList))
    }
  }

  useEffect(() => {
    if (isOpen && card) {
      setContent(card.content)
    }
  }, [isOpen, card])

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          {
            card ?
              'Edit card content' :
              <>
                Add a card into
                "{cardList.title}"
              </>
          }
        </Dialog.Title>

        {/* <Dialog.Description></Dialog.Description> */}

        <form onSubmit={handleSubmit}>
          <TextInput placeholder="Card content" value={content} onChange={handleChange} />

          <Button type="submit"
            className="bg-indigo-500">
            {
              card ?
                'Update card' :
                'Create card'
            }
          </Button>
          <Button type="button"
            onClick={() => setIsOpen(false)}
            className="bg-pink-500">
            Cancel
          </Button>
        </form>
      </Fragment>
    </Modal>
  )
}
