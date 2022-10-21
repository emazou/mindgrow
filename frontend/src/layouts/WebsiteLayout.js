import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/header/Header'
import DoctorRabbit from '../components/home/DoctorRabbit'
import '../styles/Layout.css'

function WebsiteLayout(props) {
  
  return (

<>
        <Header />
        <main id='main' className='main'>

        {props.children}
        {/* <DoctorRabbit /> */}
        </main>
        <Footer/>
    </>
  )
}

export default WebsiteLayout

