import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { FaBeer, FaStar, FaFireAlt, FaThumbsUp } from 'react-icons/fa'

const RatingForm = ({songId, postNewPerformance}) => {
  
  const [hover, setHover] = useState({
    One: null,
    Two: null,
    Three: null,
    Four: null,
    Five: null
  })

  const [performance, setPerformance] = useState ({
    stagePresence: '',
    vocalPerformance: '',
    audienceReaction: '',
    numOfDrinks: '',
    venue: '',
    notes: '',
    image: {},
    songId: songId
  })

  const [ uploadedImage, setUploadedImage] = useState([{}])

  const handleSubmit = (event) => {
    event.preventDefault()
    const body = new FormData()
    body.append('stagePresence', performance.stagePresence)
    body.append('vocalPerformance', performance.vocalPerformance)
    body.append('audienceReaction', performance.audienceReaction)
    body.append('numOfDrinks', performance.numOfDrinks)
    body.append('venue', performance.venue)
    body.append('notes', performance.notes)
    body.append('video', performance.image)
    body.append('songId', performance.songId)
    postNewPerformance(body)
    clearForm()
    
  }

  const handleFileUpload = (acceptedImage) => {
    setPerformance({
      ...performance,
      image: acceptedImage[0]
    })
    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }
  
  const clearForm = () => {
    setPerformance({
      stagePresence: '',
      vocalPerformance: '',
      audienceReaction: '',
      numOfDrinks: '',
      venue: '',
      notes: '',
      image: ''
    })
    setUploadedImage({
      preview: ""
    })
  }

  const handleInputChange = event => {
    setPerformance({
      ...performance,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const dropzoneStyle = {
    width: "85%",
    height: "70px",
    padding: "0x",
    boxShadow: "1px 2px 3px #e2e7fb"
  }

  const dropzoneText = {
    height: 70 + 'px', 
    textAlign: 'center', 
    justifyItems:'center'
  }

  return (
    <div className='rating-form-container'>
      <form onSubmit={handleSubmit}>
        <div className='icon-rating-container'>
          <h4 className='rating-titles-sm'>Stage Presence:</h4>
          <div className='wrap-icons'>
              {[...Array(5)].map((star, i) => {
                const ratingValue = (i + 1)
                return (
                  <label key={i + 1}>
                    <input
                      className='radio'
                      type='radio'
                      name='stagePresence'
                      value={ratingValue}
                      onClick={handleInputChange}
                      />
                    <FaFireAlt
                      className='rating-icon'
                      color={ratingValue <= (hover.One || performance.stagePresence) ? '#f56201' : '#e4e5e9'}
                      size={16}
                      onMouseEnter={() => setHover({...hover, One: ratingValue})}
                      onMouseLeave={() => setHover({...hover, One: null})}
                    />
                  </label>
                )
              })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4 className='rating-titles-sm'>Vocal Performance:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i+1}>
                  <input
                    className='radio'
                    type='radio'
                    name='vocalPerformance'
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaStar
                    className='rating-icon'
                    color={ratingValue <= (hover.Two || performance.vocalPerformance) ? '#f6d633' : '#e4e5e9'}
                    size={16}
                    onMouseEnter={() => setHover({...hover, Two: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Two: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4 className='rating-titles-sm'>Audience Reaction:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i+1}>
                  <input
                    className='radio'
                    type='radio'
                    name='audienceReaction'
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaThumbsUp
                    className='rating-icon'
                    color={ratingValue <= (hover.Three || performance.audienceReaction) ? '#f20c90' : '#e4e5e9'}
                    size={16}
                    onMouseEnter={() => setHover({...hover, Three: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Three: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4 className='rating-titles-sm'>Number of Drinks:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i + 1}>
                  <input
                    className='radio'
                    type='radio'
                    name='numOfDrinks'
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaBeer
                    className='rating-icon'
                    color={ratingValue <= (hover.Four || performance.numOfDrinks) ? '#6f84d1' : '#e4e5e9'}
                    size={16}
                    onMouseEnter={() => setHover({...hover, Four: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Four: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <label  >Notes:
          <input 
            className='ratings-input'
            type='text' 
            name='notes' 
            value={performance.notes} 
            onChange={handleInputChange} 
            placeholder='Anything interesting happen?'
          />
        </label>

          <input 
            className='ratings-input'
            type='text' 
            name='venue' 
            value={performance.venue} 
            onChange={handleInputChange} 
            placeholder='Venue'
          />
        
        <div className='dropzone-btn-container'>
        <div>
          <input 
            name='submit'
            id='primary-btn' 
            type='submit' 
            value='Submit' 
          />
        </div>
        <Dropzone 
          onDrop={handleFileUpload} 
          className='drop-zone'
          multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <section  style={dropzoneStyle} >
              <div {...getRootProps()}>
              <input {...getInputProps()}/>
              <p  style={dropzoneText}> Drag 'n' drop a video file of your performance!</p>
              </div>
            </section>
          )}
        </Dropzone>
          
        </div>
      </form>
    </div>
  )
}

export default RatingForm 