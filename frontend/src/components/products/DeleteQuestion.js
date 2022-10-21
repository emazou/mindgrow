import React from 'react'
import '../../styles/ModalProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { setModalDeleteQuestion } from '../../features/modalSlice'
import { useDeleteQuestionMutation } from '../../features/questionsAnswersAPI'
import { reload } from '../../features/reLoadSlice'
import toast from 'react-hot-toast'

export default function DeleteQuestion() {
    const dispatch = useDispatch()
    const [deleteQuestion] = useDeleteQuestionMutation()
    const idQuestion = useSelector(state => state.edit.idDeleteQuestion)
    async function deleteOneQuestion(){
        try{
            let res = await deleteQuestion(idQuestion)
            if(res.data?.success){
                dispatch(reload())
                dispatch(setModalDeleteQuestion())
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
                <button className='cancel-btn' onClick={() => dispatch(setModalDeleteQuestion())}>Cancel</button>
                <button className='submit-btn' onClick={deleteOneQuestion}>Delete</button>
            </div>
        </div>
    )
}
