import React from 'react'
import '../styles/Message.css'
import { useNavigate } from 'react-router-dom'
export default function Message() {
    const navigate = useNavigate()
    return (
        <div className='container-message'>
            <h2>Thanks for your purchase!!</h2>
            <button onClick={() => navigate("/products", { replace: true })}>Continue shopping</button>
        </div>
    )
}
