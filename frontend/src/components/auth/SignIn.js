import React, { useRef } from 'react'
import { useSignInMutation } from '../../features/userAPI'
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/loggedSlice'
import toast, { Toaster } from 'react-hot-toast';
import SignInGoogle from './SignInGoogle';
import '../../styles/SignInStyles.css'
import { useNavigate } from "react-router-dom"

export default function SignIn() {

    const [signInUser] = useSignInMutation()
    const dispatch = useDispatch()
    const useRefEmail = useRef()
    const useRefPassword = useRef()
    const navigate = useNavigate()
    const SignInArray = [
        { item: "Email", type: "email", value: useRefEmail, id: "signIn1", min: 4, max: 100  },
        { item: "Password", type: "password", value: useRefPassword, id: "signIn2", min: 3, max: 100 },
    ]
    function submitInfo(text) {
        text.preventDefault();

        const userSignIn = {
            mail: useRefEmail.current.value,
            password: useRefPassword.current.value,
            role: 'user',
            from: 'form'
        }
        signInUser(userSignIn).then(response => {
            if (response.data?.success) {
                dispatch(setUser(response.data.response.user))
                localStorage.setItem('token', response.data.response.token)
                toast("Welcome " + response.data.response.user.name, {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                navigate("/", { replace: true })
            } else {
                toast.error('Invalid credentials',
                    {
                        icon: "😵",
                        style: {
                            borderRadius: ".5rem",
                            background: "#3f3d56",
                            color: "aliceblue",
                        },
                    })
            }
        }).catch((error) => console.log(error))
    }
    return (

        <div className='SignInPage'>
             <div className='signIn-img'>
                    <img src="https://i.im.ge/2022/10/05/1kKVu1.SignInCanabbis.png" alt="signiage" />
                </div>
            <form className='Form' onSubmit={submitInfo}>
               
                <div className='signInInputContainer'>
                {
                    SignInArray.map((element) => {
                        return (
                                <div className='signIn-input'>
                                    <label htmlFor={element.item} > {element.item} </label>
                                    <input type={element.type} ref={element.value} required placeholder='|' />
                                </div>
                        )
                    })
                }
                <div className='Form-user'>
                    <button> Sign In!</button>
                    <SignInGoogle/>
                </div>
                </div>
            </form>

            <Toaster />

        </div>
    )
}
