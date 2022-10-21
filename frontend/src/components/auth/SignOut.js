import React from 'react'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSignOutMutation } from '../../features/userAPI'
import { deleteUser } from '../../features/loggedSlice'
import toast from "react-hot-toast";
import { clear } from '../../features/cartSlice'
export default function SignOut() {
    let user = useSelector((state) => state.logged.user)
    const dispatch = useDispatch()
    const [signOut] = useSignOutMutation()
    const navigate = useNavigate()
    async function signOutfn() {
        try {
            let res = await signOut(user.id)
            if (res.data?.success) {
                dispatch(deleteUser())
                localStorage.removeItem('token')
                dispatch(clear())
                toast(`Come back soon ${user.name}!`, {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                navigate("/", { replace: true })
            }else{
                toast.error(res.data.massage, {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }

        } catch (error) {

        }
    }
    return (
        <LinkRouter onClick={signOutfn}>Sign Out</LinkRouter>
    )
}
