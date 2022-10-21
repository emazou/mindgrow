import React, { useState, useEffect } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useGetPublicationMutation } from '../../features/publicationsAPI'
import { useSelector } from 'react-redux'
import DeletePublicationButton from '../admin/DeletePublicationButton'
import DeletePublication from '../admin/DeletePublication'
import EditFormPublication from '../admin/EditFormPublication'
import EditPublication from "../admin/EditPublication"
import Modal from '../Modal'
import '../../styles/Blog.css'

export default function DetailBlog() {
  const { id } = useParams()
  const [getPublication] = useGetPublicationMutation()
  const user = useSelector((state) => state.logged.user);
  const reload = useSelector((state) => state.reload.reloadState)
  const [edit, setEdit] = useState(false)
  const [publication2, setPublication] = useState({})
  const modalDeletePublication = useSelector((state) => state.modal.modalDeletePublication)
  const modalEditPublication = useSelector((state) => state.modal.modalEditPublication)
  let year = (new Date(publication2?.date)).getUTCFullYear()

  useEffect(() => {
    getPublication(id).then(res => {
      if (res.data?.success) {
        setPublication(res.data?.response)
      }
    }).catch(error => console.log(error))
  }, [reload])

  return (
    <div className='detail-div'>
      {user && user.role === "admin" && (
        <button className="options" onClick={() => setEdit(!edit)}>
          <img src="/assets/icons/option.png" alt="icon" />
        </button>
      )}
      {edit && (
        <div className="modal-container" onClick={() => setEdit(!edit)}>
          <EditPublication id={id} />
          <DeletePublicationButton id={id} />
        </div>
      )}
      <div className='detailBlog'>
        <img src={publication2?.photo} alt={publication2?.name} />

        <div className='info-blog'>
          <p className='date-d'> {year}  </p>
          <p className='title-d'> {publication2?.title}</p>
          <p className='category-d'>{publication2?.category}</p>
          <p className='description-d'>{publication2?.description}</p>
          <p className='url-d'>Want to read more? <a href={publication2?.url}> View original article</a> </p>
          <LinkRouter className='linkto' to='/whymindgrow'>Want to read another?</LinkRouter>
        </div>
      </div>
      {modalDeletePublication && (
        <Modal>
          <DeletePublication />
        </Modal>
      )}
      {modalEditPublication && (
        <Modal>
          <EditFormPublication data={publication2} />
        </Modal>
      )}
    </div>
  )
}
