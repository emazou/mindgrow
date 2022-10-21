import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useNewPurchaseMutation } from "../../features/purchaseAPI";
import toast, { Toaster } from 'react-hot-toast';

import api_url from '../../api';
import { deleteProduct, increment, decrement, setBill } from "../../features/cartSlice";
import "../../styles/Cart.css";

export default function Cart() {
    const user = useSelector((state) => state.logged.user);
    const products = useSelector((state) => state.cart.productsCart);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let array = products.map((item) => item.price * item.quantity);
    let total = array.reduce((item, sum) => sum + item, 0);
    const [newPurchase] = useNewPurchaseMutation();
    const formBill = useRef()
    const nameProducts = products.map(product => {
        return product.name
    });
    console.log(nameProducts)
    const billSave = (e) => {
        e.preventDefault()

        // let formData = new FormData(formBill.current)
        // dispatch(setBill(Object.fromEntries(formData)));

        // let formData = new FormData(formBill.current)
        // dispatch(setBill(Object.fromEntries(formData)));
        const payload = {
            items: products.map(p => ({
                id: p.id, quantity: p.quantity,
            })),
        };

        axios.post(`${api_url}/payments`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.data.success) {
                const mercadopagoLink = res.data.url;
                window.open(mercadopagoLink);
                const formData = new FormData(formBill.current);
                const purchase = {
                    name: formData.get('name'),
                    lastname: formData.get('lastName'),
                    user: user.id,
                    productName: nameProducts,
                    productPrice: total,
                    country: formData.get('country'),
                    state: formData.get('state'),
                    shippingadress: formData.get('shipping'),
                    mail: user.mail,
                    phone: formData.get('phone'),
                };
                newPurchase(purchase).then(response => {
                    if (response.data.success) {
                        toast.success("The details of the purchase have been sent to your email", {
                            style: {
                                borderRadius: ".5rem",
                                background: "#3f3d56",
                                color: "aliceblue",
                            },
                        });
                        formBill.current.reset();
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
            } else {
                console.error('Unexpected backend response', res.data);
            }
        }).catch(console.error);
    }
    const billarray = [
        { item: "Name", name: "name", type: "text", id: "bill1" },
        { item: "Last Name", name: 'lastName', type: "text", id: "bill2" },
        { item: "Country", name: "country", type: "text", id: "bill3" },
        { item: "State", name: "state", type: "text", id: "bill4" },
        { item: "Shipping Address", name: "shipping", type: "text", id: "bill5" },
        { item: "Phone Number", name: "phone", type: "text", id: "bill6" },
    ];

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="shoppingCart">
                <div className="table-products">
                    {products.length === 0 ? (
                        <>
                            <p className="empty-p">Empty cart</p>
                            <img
                                className="empty"
                                src="https://www.qrcardboard.com/images/cart.gif?v=01"
                                alt="empty"
                            />
                            <button className="submitShop" onClick={() => navigate('/products', { replace: true })}>Shop</button>
                        </>
                    ) : (
                        <form>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="first"></th>
                                        <th className="second"> Product </th>
                                        <th className="second"> Price</th>
                                        <th className="third"> Quantity </th>
                                        <th className="third"> Total </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {" "}
                                    {products.map((p) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="first">
                                                        <button
                                                            className="remove"
                                                            type="button"
                                                            onClick={() => dispatch(deleteProduct(p.id))}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="bi bi-trash"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                    <td className="second pointer" onClick={() => navigate('/products/'+p.id, {replace: true})}>
                                                        <img src={p.photo} alt="" />
                                                        <p>{p.name} </p>
                                                    </td>
                                                    <td className="second">
                                                        <p>${p.price} </p>
                                                    </td>
                                                    <td className="input third">
                                                        <button
                                                            className="button"
                                                            type="button"
                                                            onClick={() => dispatch(decrement(p.id))}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="bi bi-patch-minus"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
                                                                />
                                                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                                            </svg>
                                                        </button>
                                                        <p className="quantity">{p.quantity}</p>
                                                        <button
                                                            className="button"
                                                            type="button"
                                                            onClick={() => dispatch(increment(p.id))}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="bi bi-patch-plus"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                                                                />
                                                                <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                    <td className="third">${(p.quantity * p.price).toFixed(2)}</td>
                                                </tr>
                                                <div className="tableLine"></div>
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </form>
                    )}
                    {products.length >= 1 && (
                        <div className="Total-cart">
                            <p> Total</p>
                            <p> ${total.toFixed(2)} </p>
                        </div>
                    )}
                </div>

                <div className="bill-data">
                    <h3>Billing Details</h3>
                    <form ref={formBill} onSubmit={billSave}>
                        {billarray.map((e) => {
                            return (
                                <label htmlFor={e.name}> {e.item}
                                    <input type="text" name={e.name} />
                                </label>
                            );
                        })}
                        <button className="submit" type="submit ">Checkout!</button>
                    </form>
                </div>
            </div>

            <div className="notifications">
                <div className="free-shipping">
                    <p>
                        Remember you get free shipping if your order is higher than $500
                    </p>
                </div>

                <div className="donations">
                    <p>
                        For every $1000 in sales we donate a percentage to this
                        organizations:{" "}
                    </p>
                    <div>
                        <img
                            src="https://researchautism.org/wp-content/uploads/2016/06/logo.gif"
                            alt=""
                        />
                        <img
                            src="https://dev.epilepsy.org.hk/wp-content/uploads/2021/01/EFHK-logo.gif"
                            alt=""
                        />

                        <p>To help funding research</p>
                    </div>
                </div>
            </div>
        </div>
    );
}