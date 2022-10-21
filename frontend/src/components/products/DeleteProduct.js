import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setModalDeleteProduct } from '../../features/modalSlice'
import { useDeleteOneProductMutation } from '../../features/productsAPI'
import { setStateProducts } from '../../features/editSlice';
import { useNavigate } from 'react-router-dom';
import '../../styles/ModalProduct.css'

export default function DeleteProduct() {
    const id = useSelector((state) => state.edit.idDelete)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setModalDeleteProduct())
    }
    const [deleteOneProduct] = useDeleteOneProductMutation()
    async function deleteProduct() {
        try {
            let res = await deleteOneProduct(id)
            if (res.data?.success) {
                dispatch(setStateProducts())
                dispatch(setModalDeleteProduct())
                toast.success("Delete successfully", {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                navigate('/products', { replace: true })
                window.location.reload()
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
                <button className='submit-btn' onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    )
}
