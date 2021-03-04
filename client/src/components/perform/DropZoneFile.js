import React from 'react'
import Dropzone from 'react-dropzone'

const DropZoneFile = ({handleFileUpload, dropzoneTitle}) => {

  const dropzoneStyle = {
    width: "85%",
    height: "70px",
    padding: "0x",
    boxShadow: "1px 2px 3px #e2e7fb"
  }

  const dropzoneText = {
    height: 70 + 'px', 
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent:'center'
  }

  return (
      <Dropzone 
            onDrop={handleFileUpload} 
            className='drop-zone'
            multiple={false}
          >
            {({getRootProps, getInputProps}) => (
              <section  style={dropzoneStyle} >
                <div {...getRootProps()}>
                <input {...getInputProps()}/>
                <p  className='rating-titles-sm' style={dropzoneText}> {dropzoneTitle}</p>
                </div>
              </section>
            )}
      </Dropzone>       
  )
}

export default DropZoneFile