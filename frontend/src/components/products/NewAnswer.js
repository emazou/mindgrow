import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNewAnswerMutation } from '../../features/questionsAnswersAPI'
import '../../styles/QuestionsAnswers.css'
import { reload } from '../../features/reLoadSlice'
import toast from 'react-hot-toast';
export default function NewAnswer({ id }) {
    const user = useSelector((state) => state.logged.user)
    const [newQuestion] = useNewAnswerMutation()
    const dispatch = useDispatch()
    const input = useRef()
    async function sendAnswer(e) {
        e.preventDefault()
        const body = {
            question: id,
            answer: input.current.value,
            user: user.id
        }
        try {
            let res = await newQuestion(body)
            if (res.data?.success) {
                dispatch(reload())
                toast.success("Answer created", {
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
        <form className='form-answer' onSubmit={sendAnswer}>
            <input type="text" minLength='3' maxLength='300' name="answer" placeholder='Write your answer...' required ref={input} />
            <button type="submit">Answer</button>
        </form>
    )
}
