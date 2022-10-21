import React, { useState, useEffect } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useGetProductMutation } from '../../features/productsAPI'
import '../../styles/Details.css'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../features/cartSlice'
import { useSelector } from 'react-redux'
import EditProduct from "./EditProduct";
import DeleteProductButton from "./DeleteProductButton";
import DeleteProduct from "./DeleteProduct";
import EditFormProduct from "./EditFormProduct";
import toast from 'react-hot-toast';
import Modal from "../Modal";
export default function Details() {
    const user = useSelector((state) => state.logged.user);
    const reload = useSelector((state) => state.reload.reloadState)
    const [edit, setEdit] = useState(false);
    const [stock, setStock] = useState('')
    const [product, setProduct] = useState({})
    const [getProduct] = useGetProductMutation()
    const { id } = useParams()
    const modalEditProduct = useSelector((state) => state.modal.modalEditProduct);
    const modalDeleteProduct = useSelector((state) => state.modal.modalDeleteProduct);
    const dispatch = useDispatch()
    useEffect(()=>{
        getProduct(id).then(res => {
            if(res.data?.success){
                setProduct(res.data?.response)
            }
        }).catch(error=> console.log(error))
    }, [reload])
    return (
        <div className='detail'>
            {user && user.role === "admin" && (
                <button className="options" onClick={() => setEdit(!edit)}>
                    <img src="/assets/icons/option.png" alt="icon" />
                </button>
            )}
            {edit && (
                <div className="modal-container" onClick={() => setEdit(!edit)}>
                    <EditProduct id={id} />
                    <DeleteProductButton id={id} />
                </div>
            )}
            <div className='image'>
                <img src={product?.photo} alt={product?.name} />
            </div>
            <div className='info-p'>
                <p className='category'>{product?.category}</p>
                <p className='subcategory'>{product?.subcategory}</p>
                <p className='name-p'>{product?.name}</p>
                <p className='description'>{product?.description}</p>
                <h3 className='price'>${product?.price}</h3>
                <div className='input-button'>
                    <p>Stock: {product?.stock}</p>
                    <input type='number' min='1' onChange={(e) => setStock(e.target.value)} max={product?.stock} />
                    <button type='button' onClick={() => {
                        dispatch(addProduct({ id: id, photo: product?.photo, name: product?.name, price: product?.price, stock: product?.stock, quantity: stock }))
                        toast.success(`Product added to cart`, {
                            style: {
                                borderRadius: ".5rem",
                                background: "#3f3d56",
                                color: "aliceblue",
                            },
                        });
                    }
                    }>Add to cart</button>
                </div>
                <LinkRouter to='/products'>Continue shopping!</LinkRouter>
            </div>
            {modalEditProduct && (
                <Modal>
                    <EditFormProduct data={product} />
                </Modal>
            )}
            {modalDeleteProduct && (
                <Modal>
                    <DeleteProduct />
                </Modal>
            )}
        </div>
    )
}
