import { Dialog } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'
import { TextInput } from '../Layout/TextInput'
import { cardListCreated, cardListUpdated } from '../../reducers/cardLists'
import { boardUpdated } from '../../reducers/boards'
import boardsApi from '../../api/boards'
import cardListsApi from '../../api/cardLists'

export const NewCardList = ({ cardList, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.id.toString() === boardId)

  const [title, setTitle] = useState(cardList ? cardList.title : '')
  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    setIsOpen(false)
    setTitle('')
    if (cardList) {
      const updatedCardList = {
        ...cardList,
        title
      }
      cardListsApi.updateCardList(cardList.id, updatedCardList)
      dispatch(cardListUpdated(updatedCardList))
    } else {
      const newCardList = {
        title
      }
      const { data } = await cardListsApi.createCardListsByBoardId(boardId, newCardList)
      dispatch(cardListCreated(data))
      const { data: updatedBoard } = await boardsApi.getBoardById(boardId)
      dispatch(boardUpdated(updatedBoard))
    }
  }

  useEffect(() => {
    if (isOpen && cardList) {
      setTitle(cardList.title)
    }
  }, [isOpen, cardList])

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          {
            cardList ?
              'Edit list title' :
              <>
                Add a list into
                "{board.title}"
              </>
          }
        </Dialog.Title>

        {/* <Dialog.Description></Dialog.Description> */}

        <form onSubmit={handleSubmit}>
          <TextInput placeholder="List title" value={title} onChange={handleChange} />

          <Button type="submit"
            className="bg-indigo-500">
            {
              cardList ?
                'Update list' :
                'Create list'
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
