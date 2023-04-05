import React, { useState, useEffect } from 'react'
import { BsPen } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import authservice from '../auth.service'
import './index.css'
import { URL_LINK_MAIN } from '../URLS'
import ImageModal from './ImageModal'
const ImageInput = ({ name, onChange, showPreview, imageData, defaultPic }) => {
  const user = authservice.getCurrentUser()
  const [pic_url, setPic_Url] = useState('')
  const [image, setImage] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)

  useEffect(() => {
    const URL_LINK = `${URL_LINK_MAIN}/post_app_user/fetch_single_user/${user.id}`
    if (user) {
      axios.get(URL_LINK).then((response) => {
        setPic_Url(response.data.profile_pic_url)
      })
    }
  }, [imageData])

  const onChangeHandler = (file) => {
    onChange({
      [name]: {
        data: file[0],
        src: URL.createObjectURL(file[0]),
      },
    })
  }

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files
      var url = URL.createObjectURL(file[0])
      var img = new Image()
      img.src = url
      img.onload = function () {
        setWidth(this.width)
        setHeight(this.height)
      }
      const maxAllowedSize = 5 * 1024 * 1024
      if (file[0].size > maxAllowedSize) {
      } else {
        setImage(file[0])
        setModalIsOpen(true)
      }
      e.target.value = null
    }
  }
  let inputElement

  return (
    <>
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={() => {
          setModalIsOpen((prevState) => !prevState)
        }}
        image={image}
        onCropImage={(croppedImg) => onChangeHandler([croppedImg])}
        ratio={height / width <= 0.5 ? true : false}
      />
      {showPreview && (
        <div>
          <img
            key={imageData}
            src={imageData ? imageData : pic_url}
            className={imageData ? 'company-logo' : 'company-logo'}
            alt='img'
            onError={(e) => (e.target.src = defaultPic)}
          />
        </div>
      )}
      <div className='editicons'>
        <BsPen className='editicons-1' onClick={() => inputElement.click()} />
        <AiOutlineDelete
          className='editicons-1'
          onClick={() => alert('delete icon')}
        />
      </div>
      <input
        ref={(input) => (inputElement = input)}
        accept='image/*'
        type='file'
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </>
  )
}

export default ImageInput
