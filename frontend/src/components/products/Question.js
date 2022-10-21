import React, { useEffect, useState } from 'react'
import Answer from './Answer'
import { useGetAnswerMutation } from '../../features/questionsAnswersAPI'
import { useSelector, useDispatch } from 'react-redux'
import { setModalDeleteQuestion } from '../../features/modalSlice'
import Modal from '../Modal'
import DeleteQuestion from './DeleteQuestion'
import '../../styles/QuestionsAnswers.css'
import { setIdDeleteQuestion } from '../../features/editSlice'
export default function Question({ question, id, user }) {
    const userP = useSelector(state => state.logged.user)
    const [answer, setAnswer] = useState({})
    const modalDeleteQuestion = useSelector(state => state.modal.modalDeleteQuestion)
    const [getAnswer] = useGetAnswerMutation()
    const dispatch = useDispatch()
    async function getOneAnswer() {
        try {
            let res = await getAnswer(id)
            if (res.data?.success) {
                setAnswer(res.data?.response)
                console.log(res.data?.response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOneAnswer()
    }, [])
    return (
        <div className='question'>
            <p className='question-p'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
                {question}</p>
            {
                (userP?.id === user._id || userP?.role === "admin") &&
                <button className='delete' type="button" onClick={() => {
                    dispatch(setModalDeleteQuestion())
                    dispatch(setIdDeleteQuestion(id))
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    Remove question
                </button>
            }
            <div className='answer-component'>
                {<Answer id={id} answerQuestion={answer.answer} idAnswer={answer._id} />}
            </div>
            {
                modalDeleteQuestion &&
                <Modal>
                    <DeleteQuestion />
                </Modal>
            }
        </div>
    )
}
