import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { TextInput } from '../Layout/TextInput'
import { Button } from '../Layout/Button'
import { useDispatch } from 'react-redux'
import { createBoard, updateBoard } from '../../actions/boards'
import { useHistory } from 'react-router'
import { Modal } from '../Layout/Modal'

export const NewBoard = ({ board, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState(board ? board.name : '')
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) return

    setIsOpen(false)
    setName('')

    if (!board) {
      const { payload } = await dispatch(createBoard({
        name
      }))
      history.push(`/boards/${payload.id}`)
    } else {
      dispatch(updateBoard(board.id, {
        name
      }))
    }
  }

  useEffect(() => {
    if (isOpen && board) {
      setName(board.name)
    }
  }, [isOpen, board])

  return (
    <Modal show={isOpen} setIsOpen={setIsOpen}>
      <Fragment>
        <Dialog.Title
          className="font-bold text-lg flex gap-1 items-center"
        >
          {
            board ?
              'Edit board title' :
              'Add board title'
          }
        </Dialog.Title>

        {/* <Dialog.Description></Dialog.Description> */}

        <form onSubmit={handleSubmit}>
          <TextInput placeholder="Board title" value={name} onChange={handleChange} />

          <Button type="submit"
            className="bg-indigo-500">
            {
              board ?
                'Update board' :
                'Create board'
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
