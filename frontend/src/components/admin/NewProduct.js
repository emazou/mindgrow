import '../../styles/NewProduct.css';
import { useRef, useState } from "react";
import { useGetNewProductMutation } from '../../features/productsAPI';
import toast, { Toaster } from 'react-hot-toast';

function Input({ label, name }) {
    return (
        <label className="form-label-new-product">
            {label}
            <input name={name} />
        </label>
    );
}

export default function NewProduct() {

    const [newProduct] = useGetNewProductMutation()
    const formRef = useRef();
    const formRef2 = useRef();
    const formRef3 = useRef();
    const formRef4 = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const product = {
            name: formData.get('name'),
            category: formData.get('category'),
            subcategory: formData.get('subcategory'),
            description: formData.get('description'),
            price: formData.get('price'),
            stock: formData.get('stock'),
            photo: formData.get('photo'),
        };
        newProduct(product).then(response => {
            if (response.data.success) {
                toast("You have added a new product", {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
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
        }).catch(error => console.log(error));
        formRef.current.reset();
    }
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef2.current);
        const product = {
            name: formData.get('name'),
            category: formData.get('category'),
            subcategory: formData.get('subcategory'),
            description: formData.get('description'),
            price: formData.get('price'),
            stock: formData.get('stock'),
            photo: formData.get('photo'),
        };
        newProduct(product).then(response => {
            if (response.data.success) {
                toast("You have added a new product", {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
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
        }).catch(error => console.log(error));
        formRef2.current.reset();
    }
    const handleSubmit3 = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef3.current);
        const product = {
            name: formData.get('name'),
            category: formData.get('category'),
            subcategory: formData.get('subcategory'),
            description: formData.get('description'),
            price: formData.get('price'),
            stock: formData.get('stock'),
            photo: formData.get('photo'),
        };
        newProduct(product).then(response => {
            if (response.data.success) {
                toast("You have added a new product", {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
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
        }).catch(error => console.log(error));
        formRef3.current.reset();
    }
    const handleSubmit4 = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef4.current);
        const product = {
            name: formData.get('name'),
            category: formData.get('category'),
            subcategory: formData.get('subcategory'),
            description: formData.get('description'),
            price: formData.get('price'),
            stock: formData.get('stock'),
            photo: formData.get('photo'),
        };
        newProduct(product).then(response => {
            if (response.data.success) {
                toast("You have added a new product", {
                    icon: "😏",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
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
        }).catch(error => console.log(error));
        formRef4.current.reset();
    }

    const [open, setOpen] = useState(true);
    const openForm = () => {
        if (open2 === false && open3 === false && open4 === false) {
            if (open === true) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        }
    };
    const [open2, setOpen2] = useState(false);
    const openForm2 = () => {
        if (open === false && open3 === false && open4 === false) {
            if (open2 === true) {
                setOpen2(false);
            } else {
                setOpen2(true);
            }
        }
    };
    const [open3, setOpen3] = useState(false);
    const openForm3 = () => {
        if (open === false && open2 === false && open4 === false) {
            if (open3 === true) {
                setOpen3(false);
            } else {
                setOpen3(true);
            }
        }
    };
    const [open4, setOpen4] = useState(false);
    const openForm4 = () => {
        if (open === false && open2 === false && open3 === false) {
            if (open4 === true) {
                setOpen4(false);
            } else {
                setOpen4(true);
            }
        }
    };

    function Form() {
        return (
            <div className="body-new-product">
                <div className='container-form-new-product'>
                    <form ref={formRef} action="#" className="form-new-product">
                        <div className='container-input-new-product'>
                            <Input label="Name" name="name" />
                            <Input label="Photo" name="photo" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Price" name="price" />
                            <Input label="Stock" name="stock" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Category" name="category" />
                            <Input label="Subcategory" name="subcategory" />
                        </div>
                        <label className="form-label-new-product">
                            Description
                            <textarea className="text-tarea" name="description" />
                        </label>
                        <button type="submit" onClick={handleSubmit}> Add product </button>
                    </form>
                    <Toaster />
                </div>
            </div>
        )
    }
    function Form2() {
        return (
            <div className="body-new-product">
                <div className='container-form-new-product'>
                    <form ref={formRef2} action="#" className="form-new-product">
                        <div className='container-input-new-product'>
                            <Input label="Name" name="name" />
                            <Input label="Photo" name="photo" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Price" name="price" />
                            <Input label="Stock" name="stock" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Category" name="category" />
                            <Input label="Subcategory" name="subcategory" />
                        </div>
                        <label className="form-label-new-product">
                            Description
                            <textarea className="text-tarea" name="description" />
                        </label>
                        <button type="submit" onClick={handleSubmit2}> Add product </button>
                    </form>
                    <Toaster />
                </div>
            </div>
        )
    }
    function Form3() {
        return (
            <div className="body-new-product">
                <div className='container-form-new-product'>
                    <form ref={formRef3} action="#" className="form-new-product">
                        <div className='container-input-new-product'>
                            <Input label="Name" name="name" />
                            <Input label="Photo" name="photo" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Price" name="price" />
                            <Input label="Stock" name="stock" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Category" name="category" />
                            <Input label="Subcategory" name="subcategory" />
                        </div>
                        <label className="form-label-new-product">
                            Description
                            <textarea className="text-tarea" name="description" />
                        </label>
                        <button type="submit" onClick={handleSubmit3}> Add product </button>
                    </form>
                    <Toaster />
                </div>
            </div>
        )
    }
    function Form4() {
        return (
            <div className="body-new-product">
                <div className='container-form-new-product'>
                    <form ref={formRef4} action="#" className="form-new-product">
                        <div className='container-input-new-product'>
                            <Input label="Name" name="name" />
                            <Input label="Photo" name="photo" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Price" name="price" />
                            <Input label="Stock" name="stock" />
                        </div>
                        <div className='container-input-new-product'>
                            <Input label="Category" name="category" />
                            <Input label="Subcategory" name="subcategory" />
                        </div>
                        <label className="form-label-new-product">
                            Description
                            <textarea className="text-tarea" name="description" />
                        </label>
                        <button type="submit" onClick={handleSubmit4}> Add product </button>
                    </form>
                    <Toaster />
                </div>
            </div>
        )
    }

    return (
        <div className="container-grandfather-new-product">
            <div className="title-new-product">
                <h2>Create new Products</h2>
            </div>
            <div className="title-new-product-select">
                <h4>Select the number of products</h4>
            </div>
            <div className="container-dad-new-product">
                <div className="btn-select">
                    <button type="submit" onClick={openForm}> 1 </button>
                    <button type="submit" onClick={openForm2}> 2 </button>
                    <button type="submit" onClick={openForm3}> 3 </button>
                    <button type="submit" onClick={openForm4}> 4 </button>
                </div>
                <div className="container-forms-new-product">
                    {open ? (
                        <div className='form-children-new-product'>
                            <Form />
                        </div>
                    ) : null}
                    {open2 ? (
                        <div className='form-children-new-product'>
                            <Form />
                            <Form2 />
                        </div>
                    ) : null}
                    {open3 ? (
                        <div className='form-children-new-product'>
                            <Form />
                            <Form2 />
                            <Form3 />
                        </div>
                    ) : null}
                    {open4 ? (
                        <div className='form-children-new-product'>
                            <Form />
                            <Form2 />
                            <Form3 />
                            <Form4 />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}