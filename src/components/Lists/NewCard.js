import { Dialog } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'
import { TextInput } from '../Layout/TextInput'

export const NewCard = ({ card, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const { listId } = useParams()
  const lists = useSelector(state => state.lists)
  const list = {
    name: 'dummy'
  }// lists.find(list => list.id.toString() === listId)

  const [name, setName] = useState(card ? card.name : '')
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) return

    setIsOpen(false)
    setName('')
  }

  useEffect(() => {
    if (isOpen && card) {
      setName(card.name)
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
              'Edit card title' :
              <>
                Add another card into
                "{list.name}"
              </>
          }
        </Dialog.Title>

        {/* <Dialog.Description></Dialog.Description> */}

        <form onSubmit={handleSubmit}>
          <TextInput placeholder="Card title" value={name} onChange={handleChange} />

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
