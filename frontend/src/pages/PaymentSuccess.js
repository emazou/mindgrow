import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Message from '../components/Message';

import { clear } from "../features/cartSlice";

export default function PaymentSuccess() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clear());
    }, []);
    return (
        <Message />
    )
}