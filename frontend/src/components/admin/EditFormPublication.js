import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { reload } from '../../features/reLoadSlice'
import { setModalEditPublication } from '../../features/modalSlice'
import { useEditPublicationMutation } from '../../features/publicationsAPI'
import toast from 'react-hot-toast'
import '../../styles/EditFormProduct.css'

export default function EditFormPublication({ data }) {
  const formRef = useRef()
  const dispatch = useDispatch()
  const [title, setTitle] = useState(data?.title)
  const [category, setCategory] = useState(data?.category)
  const [description, setDescription] = useState(data?.description)
  const [url, setUrl] = useState(data?.url)
  const [photo, setPhoto] = useState(data?.photo)
  const [editPublication] = useEditPublicationMutation()
  const formData = [
    {
      nameForm: "Publication title",
      name: "title",
      type: "text",
      value: title,
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
      nameForm: "Description",
      name: "description",
      type: "text",
      value: description,
      min: 4
    },
    {
      nameForm: "Url",
      name: "url",
      type: "text",
      value: url,
      min: 4,
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
            if (item.name === "title") {
              return setTitle(e.target.value)
            } else if (item.name === "category") {
              return setCategory(e.target.value)
            } else if (item.name === "url") {
              return setUrl(e.target.value)
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
            maxLength={item.max}
            minLength={item.min}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
      }

    </label>
  )
  async function editOnePublication(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(formRef.current))
    const body = {
      ...form, _id: data._id, date: new Date().getFullYear().toString(),
    }
    try {
      let res = await editPublication(body)
      if (res.data?.success) {
        dispatch(reload())
        dispatch(setModalEditPublication())
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
    <form className='container-edit' ref={formRef} onSubmit={editOnePublication}>
      {
        formData.map(input)
      }
      <div>
        <button className='cancel-btn' type='button' onClick={()=> dispatch(setModalEditPublication())}>Cancel</button>
        <button className='submit-btn' type='submit'>Edit</button>
      </div>
    </form>
  )
}