import React from 'react'
import '../../styles/Products.css'
import { useDispatch } from 'react-redux'
import { setModalEditProduct } from '../../features/modalSlice'
import { setIdEdit } from '../../features/editSlice'
export default function EditProduct({ id }) {
  const dispatch = useDispatch()
  const openModal = () => {
    dispatch(setIdEdit(id))
    dispatch(setModalEditProduct())
  }
  return (
    <button className='edit-btn' onClick={openModal}>Edit</button>
  )
}
