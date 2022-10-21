import React from 'react'
import '../../styles/Products.css'
import { useDispatch} from 'react-redux'
import { setModalDeleteProduct } from '../../features/modalSlice'
import { setIdDelete } from '../../features/editSlice'
export default function DeleteProduct({id}) {
    const dispatch = useDispatch()
    const openModal = () => {
      dispatch(setIdDelete(id))
        dispatch(setModalDeleteProduct())
    }
  return (
    <button className='edit-btn' onClick={openModal}>Delete</button>
  )
}
