import React from 'react'
import { useGetAllPublicationsQuery } from '../../features/publicationsAPI'
import '../../styles/Publication.css'
import { useNavigate } from 'react-router-dom'
export default function Publication() {
    const navigate = useNavigate()
    const { data } = useGetAllPublicationsQuery({ category: '' })
    const publication = data?.response[1]
    return (
        <div className='container-publication'>
            <div className='publication-container'>
                <img src={publication?.photo} alt='publication' />
                <div className='publication-info'>
                    <h3>Blog</h3>
                    <h2>{publication?.title}</h2>
                    <p className='date'>{(new Date(publication?.date)).getUTCFullYear()}</p>
                    <p className='description'>{publication?.description.slice(0, 210)}[...]</p>
                    <button onClick={() => navigate("/whymindgrow", { replace: true })}>Go to blog</button>
                </div>
            </div>
        </div>
    )
}
