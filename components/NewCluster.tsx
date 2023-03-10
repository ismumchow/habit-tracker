'use client'

import { createNewCluster } from "@/lib/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Buttons";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewCluster = () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createNewCluster(name)
    closeModal()
  }

  return (
    <div className=" w-fill px-6 py-8 hover:scale-105 transition-all ease-in-out duration-100 flex justify-center items-center">
      <Button className="w-3/3 h-fill py-8" onClick={() => openModal()}>+ New Cluster</Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6"> New Cluster</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="cluster name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button className="mx-5 " type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  )
}

export default NewCluster
