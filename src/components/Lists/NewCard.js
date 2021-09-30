import { Dialog } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCardListsByBoard } from '../../actions/cardLists'
import { createCardByCardList, updateCard } from '../../actions/cards'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'
import { TextInput } from '../Layout/TextInput'

export const NewCard = ({ card, cardList, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
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
      dispatch(updateCard(card.id, {
        ...card,
        content,
        card_list_id: card.card_list_id,
      }))
    } else {
      await dispatch(createCardByCardList(cardList.id, {
        content,
      }))
    }
    dispatch(getCardListsByBoard(boardId))
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
