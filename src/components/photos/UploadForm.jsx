import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileTypesAllowed = ['image/png', 'image/jpeg'];

  function changeHandler(e) {
    let selectedFile = e.target.files[0];
    
    if (selectedFile && fileTypesAllowed.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a JPEG or PNG image file')
    }
  }

  return (
    <form>
      <div className="output">
        { error && <div className="error">{error}</div> }
        {/* { file && <div>{ file.name }</div> } */}
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
    </form>
  )
}
