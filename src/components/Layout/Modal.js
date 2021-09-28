import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const Modal = ({ children, isOpen, setIsOpen, ...props }) => {

  return (
    <Transition appear show={isOpen} as={Fragment} {...props}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded mx-auto w-4/5 max-w-lg p-6 -mt-20">
              {/* ModalBody */}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}