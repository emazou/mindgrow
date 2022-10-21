import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNewQuestionMutation } from '../../features/questionsAnswersAPI'
import '../../styles/Details.css'
import { reload } from '../../features/reLoadSlice'
import toast from 'react-hot-toast';
export default function NewQuestion({ id }) {
    const user = useSelector((state) => state.logged.user)
    const [newQuestion] = useNewQuestionMutation()
    const dispatch = useDispatch()
    const input = useRef()
    const form = useRef()
    async function sendQuestion(e) {
        e.preventDefault()
        const body = {
            product: id,
            question: input.current.value,
            user: user.id
        }
        try {
            let res = await newQuestion(body)
            if (res.data?.success) {
                dispatch(reload())
                toast.success(res.data?.message, {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                form.current.reset()
            }else{
                toast.error("Length must be at least 4 characters long", {
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
        <form className='form-question' onSubmit={sendQuestion} ref={form}>
            <label className='question-label'>
                Ask the seller
                <input type="text" minLength='3' maxLength='300' name="question" required placeholder='Write your question...' ref={input} />
            </label>
            <button type="submit">Ask</button>
        </form>
    )
}
