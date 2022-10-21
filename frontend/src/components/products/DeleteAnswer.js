import React from 'react'
import '../../styles/ModalProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { setModalDeleteAnswer } from '../../features/modalSlice'
import { useDeleteAnswerMutation } from '../../features/questionsAnswersAPI'
import { reload } from '../../features/reLoadSlice'
import toast from 'react-hot-toast'

export default function DeleteAnswer() {
    const dispatch = useDispatch()
    const [deleteAnswer] = useDeleteAnswerMutation()
    const idAnswer = useSelector(state => state.edit.idDeleteAnswer)
    async function deleteOneAnswer(){
        try{
            let res = await deleteAnswer(idAnswer)
            if(res.data?.success){
                dispatch(reload())
                dispatch(setModalDeleteAnswer())
                toast.success("Delete successfully", {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }else{
                toast.error(res.data.message, {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='modal-open-container'>
            <p>Are you sure?</p>
            <div>
                <button className='cancel-btn' onClick={() => dispatch(setModalDeleteAnswer())}>Cancel</button>
                <button className='submit-btn' onClick={deleteOneAnswer}>Delete</button>
            </div>
        </div>
    )
}
