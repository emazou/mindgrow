import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEditProfileMutation } from '../../features/userAPI'
import { reload } from '../../features/reLoadSlice'
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast";
export default function ProfileEdit(props) {
    const [name, setName] = useState(props.name)
    const [lastName, setLastName] = useState(props.lastName)
    const [country, setCountry] = useState(props.country)
    const [photo, setPhoto] = useState(props.photo)
    const [mail, setMail] = useState(props.mail)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [editProfile] = useEditProfileMutation()

    const nameRef = useRef()
    const lastNameRef = useRef()
    const countryRef = useRef()
    const photoRef = useRef()
    const mailRef = useRef()

    const profileArray = [
        { item: "Name", name: "name", type: "text", id: "prof1", value: nameRef, defaultValue: `${name}` },
        { item: "Last Name", name: 'lastName', type: "text", id: "prof2", value: lastNameRef, defaultValue: `${lastName}` },
        { item: "Country", name: "country", type: "text", id: "prof3", value: countryRef, defaultValue: `${country}` },
        { item: "Photo", name: "photo", type: "url", id: "prof4", value: photoRef, defaultValue: `${photo}` },
        { item: "Email", name: "mail", type: "email", id: "prof5", value: mailRef, defaultValue: `${mail}` }
    ];


    const handleSubmitUpdateProfile = (e) => {
        e.preventDefault()

        let profileUpdated = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            country: countryRef.current.value,
            photo: photoRef.current.value,
            mail: mailRef.current.value,
            _id: `${props.id}`,
        }
        editProfile(profileUpdated).then((res) => {
            if (res.data?.success) {
                dispatch(reload())
                toast.success(res.data?.message, {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            } else {
                toast.error("Error", {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <form id='form-edit-prof' onSubmit={handleSubmitUpdateProfile}>
            {profileArray.map((e) => {
                return (
                    <label key={e.id} htmlFor={e.name}> {e.item}
                        <input onChange={(i) => {
                            if (e.name === 'name') {
                                return setName(i.target.value)

                            } else if (e.name === 'lastName') {
                                return setLastName(i.target.value)

                            } else if (e.name === 'country') {
                                return setCountry(i.target.value)

                            } else if (e.name === 'photo') {
                                return setPhoto(i.target.value)

                            } else {
                                return setMail(i.target.value)

                            }
                        }
                        } type="text" name={e.name} ref={e.value} value={e.defaultValue} />
                    </label>
                );
            })}
            <button className="submit" type="submit ">Edit!</button>
        </form>

    )

}
