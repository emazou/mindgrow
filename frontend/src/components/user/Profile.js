import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useProfileOneMutation} from '../../features/userAPI'
import '../../styles/Profile.css'
import ProfileEdit from './ProfileEdit'
import { useDispatch, useSelector } from 'react-redux' 
import {setUser} from '../../features/loggedSlice'

export default function Profile() {

  const { id } = useParams()

  const dispatch = useDispatch()
  const reloadState = useSelector(state => state.reload.reloadState)
  const [userProfile, setUserProfile] = useState({})
  const [userRead] = useProfileOneMutation()
  async function readUser(){
    try {
      let res = await userRead(id)
      if (res.data?.success){
        setUserProfile(res.data?.response)
        dispatch(setUser(res.data?.response))
      }else {
        console.log(res.error)
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() =>{
    readUser()
  },[reloadState])
  

  const [showEdit, setShowEdit] = useState(false)

  function show() {
    setShowEdit(!showEdit)
  }

  return (
    <div className='profile-div'>
      <h3>Profile</h3>
      <div className='dashboard-top'>
        <img src={userProfile?.photo} alt={userProfile?.name}/>
        <h2>{userProfile?.name} {userProfile?.lastName}</h2>
        <p>{userProfile?.role}</p>
        <p>{userProfile?.mail}</p>
        <p>{userProfile?.country}</p>
      </div>
      <div className='button-div'>
        <button onClick={show} >Edit your profile info</button>
        {
          showEdit ? (
            <ProfileEdit id={userProfile?.id} name={userProfile?.name} lastName={userProfile?.lastName} photo={userProfile?.photo} mail={userProfile?.mail} country={userProfile?.country} />
          ) : null
        }
      </div>
      
      
    </div>
  )
}
