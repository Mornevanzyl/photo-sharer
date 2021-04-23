import React, { useState, useContext } from 'react'
import { AuthContext } from '../authentication/AuthContext';
import ImageGrid from './ImageGrid'
import Modal from './Modal'
import Navbar from './Navbar'
import UploadForm from './UploadForm'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={"photo-container"}>
      <div className={"photos"}>
        <Navbar />
        <ImageGrid setSelectedImage={setSelectedImage} />
        { selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> }
      </div>
      <div className={"photos-status"}>
        <UploadForm />
      </div>
    </div>
  )
}

