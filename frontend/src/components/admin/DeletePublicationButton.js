import React from 'react'
import '../../styles/Products.css'
import { useDispatch} from 'react-redux'
import { setModalDeletePublication } from '../../features/modalSlice'
import { setIdDelete } from '../../features/editSlice'
export default function DeletePublicationButton({id}) {
    const dispatch = useDispatch()
    const openModal = () => {
      dispatch(setIdDelete(id))
        dispatch(setModalDeletePublication())
    }
  return (
    <button className='edit-btn' onClick={openModal}>Delete</button>
  )
}