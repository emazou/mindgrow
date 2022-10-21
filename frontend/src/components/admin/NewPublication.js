import { useRef, useState } from "react";
import { useGetNewPublicationMutation } from '../../features/publicationsAPI';
import { useSelector } from 'react-redux';
import '../../styles/NewPublication.css'
import toast, { Toaster } from 'react-hot-toast';

function Input({ label, name, min, max, placeholder }) {
    return (
        <label>
            {label}
            <input name={name} minLength={min} placeholder={placeholder} maxLength={max} required />
        </label>
    );
}

export default function NewPublication({ handleRefetch }) {

    const user = useSelector((state) => state.logged.user);
    const admin = user?.role === 'admin';

    const [newPublication] = useGetNewPublicationMutation();
    const formPublication = useRef();
    const year = new Date().getFullYear().toString();
    const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formPublication.current);
        const publication = {
            title: formData.get('title'),
            date: year,
            user: user.id,
            description: formData.get('description'),
            category: formData.get('category'),
            url: formData.get('url'),
            photo: formData.get('photo'),
        };
        newPublication(publication).then(response => {
            if (response.data.success) {
                toast.success("You have made a publication", {
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
                handleRefetch()
                formPublication.current.reset();
            } else {
                toast.error(response.data?.message,
                    {
                        icon: "😵",
                        style: {
                            borderRadius: ".5rem",
                            background: "#3f3d56",
                            color: "aliceblue",
                        },
                    })
            }
        }).catch(error => console.log(error.message));
        
    }

    const [open, setOpen] = useState(false);
    const openPublication = () => {
        setOpen(!open)
    };
    
    if (admin && token) {
        return (
            <div className="container-dad-publication">
                <div className="container-header-new-publication">
                    <h3>New Publication</h3>
                    <img className="icon-despleg" onClick={openPublication} src={open? "https://i.ibb.co/7zVjHzv/cancel.png":"https://cdn-icons-png.flaticon.com/512/3597/3597088.png"} alt="" width="30px"></img>
                </div>
                {open ? (
                    <div className="container-form-publication">
                        <form ref={formPublication} action="#" className="form-new-publication" onSubmit={handleSubmit}>
                            <div className="container-input-publication">
                                <Input label="Title" name="title" min={4} max={40} placeholder='Type a title' />
                                <div className="container-select-category">
                                    <label>Category</label>
                                    <select name="category" defaultValue="empty" className="select-category">
                                        <option disabled value="empty">Category</option>
                                        <option>Pets</option>
                                        <option>Health</option>
                                        <option>Social Impact</option>
                                    </select>
                                </div>
                            </div>
                            <div className="container-input-publication">
                                <Input label="Photo" name="photo" min={4} max={100} placeholder={'https://image.png'}/>
                                <Input label="Url" name="url" min={4} max={100} placeholder={' https://www.url.com/'} />
                            </div>
                            <label>
                                Description:
                                <textarea className="text-tarea" name="description" placeholder="Write a description here..." minLength='4' maxLength='3000' required />
                            </label>
                            <button className="btn-new-publication" type="submit"> Post </button>
                        </form>
                        <Toaster />
                    </div>
                ) : null}
            </div>
        )
    }
}