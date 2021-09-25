import React  , { useCallback} from "react"
import { useDropzone } from 'react-dropzone'

const containerStyle = {
    background: '#dadada',
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    textAlign: 'center',
  }

const UploadImg = () => {
    const onDrop = useCallback((acceptedFiles) => {
        console.log("upload file" , acceptedFiles)
      }, [])
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    
      return (
        <div style={containerStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag / drop some files here, or click to select files</p>
          )}
        </div>
      )
}

export default UploadImg
