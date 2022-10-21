import React from 'react'
import '../../styles/Products.css'
import { useDispatch } from 'react-redux'
import { setModalEditPublication } from '../../features/modalSlice'
import { setIdEdit } from '../../features/editSlice'
export default function EditPublication({ id }) {
  const dispatch = useDispatch()
  const openModal = () => {
    dispatch(setIdEdit(id))
    dispatch(setModalEditPublication())
  }
  return (
    <button className='edit-btn' onClick={openModal}>Edit</button>
  )
}
