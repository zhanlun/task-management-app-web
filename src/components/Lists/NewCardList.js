import { Dialog } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button } from '../Layout/Button'
import { Modal } from '../Layout/Modal'
import { TextInput } from '../Layout/TextInput'

export const NewCardList = ({ list, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.id.toString() === boardId)

  const [name, setName] = useState(list ? list.name : '')
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
    if (isOpen && list) {
      setName(list.name)
    }
  }, [isOpen, list])

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          {
            list ?
              'Edit list title' :
              <>
                Add another list into
                "{board.name}"
              </>
          }
        </Dialog.Title>

        {/* <Dialog.Description></Dialog.Description> */}

        <form onSubmit={handleSubmit}>
          <TextInput placeholder="List title" value={name} onChange={handleChange} />

          <Button type="submit"
            className="bg-indigo-500">
            {
              list ?
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
