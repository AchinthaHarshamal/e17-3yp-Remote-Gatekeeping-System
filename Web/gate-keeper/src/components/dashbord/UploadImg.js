import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';




const UploadImg = (props) => {
  
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles:1
    ,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map((file) => Object.assign(acceptedFiles, {preview: URL.createObjectURL(file)})));
      props.setFile(acceptedFiles[0])
      
    }
  });
  
 

const thumb =  (
    <div   style={thumbSty} >
      <div id = 'upload-img' style={thumbInner}>
        {files[0] ? <img alt='Profile Pic' src={files[0].preview} style={img}/> : <p>Click to select a Profile Picture</p>}
      </div>
    </div>
  )
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section  className="container">
      <div {...getRootProps({className: 'dropzone grey lighten-2' ,style:thumbsContainer})}>
        <input {...getInputProps()} />
        {thumb}
      </div>
    </section>
  );
}

export default UploadImg





const thumbsContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 5,
  border : '1px solid #eaeaea',
  minWidth : 100,
  minHeight : 100
};

const thumbSty = {
  display: 'inline-flex',
  justifyContent: 'center',
  margin: 8,
  width: '100%',
  height: 100,
  padding: 1,
  boxSizing: 'border-box',
  textAlign : 'center'
};

const thumbInner = {
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};