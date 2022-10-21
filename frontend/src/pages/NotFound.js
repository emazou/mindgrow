import React from 'react'
import '../styles/Home.css'
import { Link as LinkRouter } from 'react-router-dom'

export default function NotFound() {
  
  return (
    <div className='notfound'>
      <img src='https://i.im.ge/2022/10/06/1pjfYM.MindGrow.png' alt='notfound' />
      <p>Page not found!</p>
      <LinkRouter to={'/'}><button>Go Home</button></LinkRouter>
    </div>
  )
}
