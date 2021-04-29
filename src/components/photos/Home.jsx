import React, { useState } from 'react'
import ImageGrid from './ImageGrid'
import Modal from './Modal'
import Navbar from './Navbar'
import UploadForm from './UploadForm'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState(false);

  return (
    <div className={"photo-container"}>
      <div className={"photos"}>
        <Navbar />
        <ImageGrid setSelectedImage={setSelectedImage} allImages={allImages} />
        { selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> }
      </div>
      <div className={"photos-status"}>
        <UploadForm />
      </div>
    </div>
  )
}

