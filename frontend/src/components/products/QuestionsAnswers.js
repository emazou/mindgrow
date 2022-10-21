import React, { useEffect, useState } from 'react'
import '../../styles/Details.css'
import NewQuestion from './NewQuestion'
import { useParams } from 'react-router-dom'
import { useGetAllQuestionsMutation } from '../../features/questionsAnswersAPI'
import Question from './Question'
import { useSelector } from 'react-redux'
import '../../styles/QuestionsAnswers.css'
export default function QuestionsAnswers() {
    const [questions, setQuestions] = useState([])
    const { id } = useParams()
    const user = useSelector(state => state.logged.user)
    const reload = useSelector(state => state.reload.reloadState)
    const [getAllQuestions] = useGetAllQuestionsMutation()
    async function get() {
        try {
            let res = await getAllQuestions(id)
            if (res.data?.success) {
                setQuestions(res.data?.response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        get()
    }, [reload])
    return (
        <div className='container-question'>
            <h2 className='h2'>Questions & Answers</h2>
            {
                user && <NewQuestion id={id} />
            }
            <div className='questions-answers'>
                {
                    questions.map((item) => {
                        return (
                            <Question key={Math.random().toString(12).substring(0)} id={item._id} user={item.user} question={item?.question} />
                        )
                    })
                }
            </div>
        </div>
    )
}
