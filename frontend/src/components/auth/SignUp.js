import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../features/userAPI";
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import SignUpGoogle from './SignUpGoogle';
import '../../styles/SignUp.css'

function Input({ label, name, type }) {
    return (
        <div className='signUp-input'>
            <label>
                {label}
                <input name={name} type={type} required />
            </label>
        </div>
    );
}

export default function SignUpForm() {
    const navigate = useNavigate();
    const form = useRef();
    const [newUser] = useSignUpMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const formUser = {
            name: formData.get("name"),
            lastName: formData.get("lastname"),
            mail: formData.get("mail"),
            country: formData.get("country"),
            photo: formData.get("photo"),
            password: formData.get("password"),
            from: "form",
            role: "user"
        };
        newUser(formUser).then(response => {
            if (response.data?.success) {
                toast("It has been successfully registered", {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                navigate("/signin", { replace: true })
            } else {
                toast.error(response.data.message,
                    {
                        icon: "😵",
                        style: {
                            borderRadius: ".5rem",
                            background: "#3f3d56",
                            color: "aliceblue",
                        },
                    })
                navigate("/signin", { replace: true })
            }
        }).catch(error => console.log(error));

        form.current.reset();
    };

    return (
        <div className='sign-up-page'>
            <div className='signUp-img'>
                <img src="https://i.im.ge/2022/10/13/2s2G51.hemp-oil-from-hemp-seeds-and-leaves-medical-marijuana.jpg" alt="signiage" />
            </div>
            <form ref={form} className='Form-signup' onSubmit={handleSubmit}>
                <div className='signInInputContainer'>
                    <Input label="Name" name="name" />
                    <Input label="Last Name" name="lastname" />
                    <Input label="Mail" name="mail" />
                    <Input label="Country" name="country" />
                    <Input label="Photo URL" name="photo" />
                    <Input label="Password" name="password" type="password" />
                </div>
                <div className='Form-user-signup'>
                    <button type="submit" >
                        Sign Up!
                    </button>
                    <SignUpGoogle />
                </div>
            </form>
            <Toaster />
        </div>
    );
}