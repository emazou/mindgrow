import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setModalDeletePublication } from '../../features/modalSlice'
import { useDeletePublicationMutation } from '../../features/publicationsAPI'
import { setStatePublications } from '../../features/editSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/ModalProduct.css'

export default function DeletePublication() {
    const id = useSelector((state) => state.edit.idDelete)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setModalDeletePublication())
    }
    const [deleteOnePublication] = useDeletePublicationMutation()
    async function deletePublication() {
        try {
            let res = await deleteOnePublication(id)
            if (res.data?.success) {
                dispatch(setStatePublications())
                dispatch(setModalDeletePublication())
                toast.success("Delete successfully", {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                navigate('/whymindgrow', { replace: true })
            } else {
                toast.error("Couldn't be deleted", {
                    icon: "😞",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='modal-open-container'>
            <p>Are you sure?</p>
            <div>
                <button className='cancel-btn' onClick={closeModal}>Cancel</button>
                <button className='submit-btn' onClick={deletePublication}>Delete</button>
            </div>
        </div>
    )
}
