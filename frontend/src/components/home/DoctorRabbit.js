import React from 'react'
import '../../styles/DoctorRabbit.css'
export default function DoctorRabbit() {
    return (
        <div className='DoctorRabbit'>
            <div className='Rabbit-Container'>
                <img className='Rabbit' src="https://i.im.ge/2022/10/04/1VjDyG.doctor-rabbit.png" alt="" />
            </div>
            <input type="text" name="bot" value="" placeholder='How can I help you' />
        </div>
    )
}
