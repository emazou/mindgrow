import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { reload } from '../../features/reLoadSlice'
import { setModalEditProduct } from '../../features/modalSlice'
import { useEditProductMutation } from '../../features/productsAPI'
import toast from 'react-hot-toast';
import '../../styles/EditFormProduct.css'
export default function EditFormProduct({ data }) {
  const formRef = useRef()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(data?.name)
  const [category, setCategory] = useState(data?.category)
  const [subcategory, setSubcategory] = useState(data?.subcategory)
  const [description, setDescription] = useState(data?.description)
  const [price, setPrice] = useState(data?.price)
  const [stock, setStock] = useState(data?.stock)
  const [photo, setPhoto] = useState(data?.photo)
  const [editProduct] = useEditProductMutation()
  const formData = [
    {
      nameForm: "Product name",
      name: "name",
      type: "text",
      value: product,
      min: 4,
      max: 40
    },
    {
      nameForm: "Category",
      name: "category",
      type: "text",
      value: category,
      min: 4,
      max: 40
    },
    {
      nameForm: "Subcategory",
      name: "subcategory",
      type: "text",
      value: subcategory,
      min: 4,
      max: 40
    },
    {
      nameForm: "Description",
      name: "description",
      type: "text",
      value: description,
      min: 20,
      max: 700
    },
    {
      nameForm: "Price",
      name: "price",
      type: "text",
      value: price,
      min: 1,
      max: 1000
    },
    {
      nameForm: "Stock",
      name: "stock",
      type: "number",
      value: stock,
      min: 0,
      max: 1000
    },
    {
      nameForm: "Photo",
      name: "photo",
      type: "text",
      value: photo,
      min: 4,
      max: 1000
    },

  ]
  const input = (item) => (
    <label className='label-modal' htmlFor={item.name} key={Math.random().toString(12).substring(0)}>
      {item.nameForm}
      {
        item.name !== 'description' ? <input className='input-edit'
          type={item.type}
          name={item.name}
          value={item.value}
          onChange={(e) => {
            if (item.name === "name") {
              return setProduct(e.target.value)
            } else if (item.name === "category") {
              return setCategory(e.target.value)
            } else if (item.name === "subcategory") {
              return setSubcategory(e.target.value)
            } else if (item.name === "price") {
              return setPrice(e.target.value)
            } else if (item.name === "stock") {
              return setStock(e.target.value)
            } else {
              return setPhoto(e.target.value)
            }
          }}
          max={item.max}
          min={item.min}
          maxLength={item.max}
          minLength={item.min}
          required
        /> :
          <textarea
            rows="5"
            type={item.type}
            name={item.name}
            value={item.value}
            max={item.max}
            min={item.min}
            maxLength={item.max}
            minLength={item.min}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
      }

    </label>
  )
  async function editOneProduct(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(formRef.current))
    const body = {
      ...form, _id: data._id
    }
    console.log(body)
    try {
      let res = await editProduct(body)
      if (res.data?.success) {
        dispatch(reload())
        dispatch(setModalEditProduct())
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
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className='container-edit' ref={formRef} onSubmit={editOneProduct}>
      {
        formData.map(input)
      }
      <div>
        <button className='cancel-btn' type='button' onClick={()=> dispatch(setModalEditProduct())}>Cancel</button>
        <button className='submit-btn' type='submit'>Edit</button>
      </div>
    </form>
  )
}