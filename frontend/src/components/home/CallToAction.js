import React from 'react'
import '../../styles/CallToAction.css'
import {Link as LinkRouter} from 'react-router-dom'


export default function CallToAction(props) {

    let linkTo = props.linkTo
    let buttonAction = props.buttonAction

  return (

    <div>
        <LinkRouter to={linkTo} className='Action-Button'> {buttonAction}</LinkRouter>
    </div>

  )
}
