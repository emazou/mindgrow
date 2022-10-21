import React from 'react'
import Details from '../components/products/Details'
import QuestionsAnswers from '../components/products/QuestionsAnswers'
import '../styles/Details.css'
export default function DetailsPage() {
  return (
    <div className='details-container'>
        <Details />
        <QuestionsAnswers />
    </div>
  )
}
