import React, {useState} from 'react'

import { FaBeer, FaStar, FaFireAlt, FaThumbsUp, FaVideo} from 'react-icons/fa'

import DropZoneFile from './DropZoneFile'

const RatingForm = ({songId, postNewPerformance, spin}) => {
  
  const [hover, setHover] = useState({
    One: 0,
    Two: 0,
    Three: 0,
    Four: 0,
    Five: 0
  })

  const [performance, setPerformance] = useState ({
    stagePresence: '0',
    vocalPerformance: '0',
    audienceReaction: '0',
    numOfDrinks: '0',
    venue: '',
    notes: '',
    image: {},
    songId: songId
  })

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
  }

  let dropzoneTitle=`Drag 'n' drop a video file of your performance!`
  if(performance.image.name) {
    dropzoneTitle = (
      <>
        <FaVideo
          className='rating-icon'
          color={'#8e9bce'}
          size={20}/> {performance.image.name} received!
      </>
    )
  }

  const clearForm = () => {
    setPerformance({
      stagePresence: '0',
      vocalPerformance: '0',
      audienceReaction: '0',
      numOfDrinks: '0',
      venue: '',
      notes: '',
      image:  {},
    })
  }

  const handleInputChange = event => {
    setPerformance({
      ...performance,
      [event.currentTarget.name]: event.currentTarget.value
    })
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
                      onMouseLeave={() => setHover({...hover, One: 0})}
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
                    onMouseLeave={() => setHover({...hover, Two: 0})}
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
                    onMouseLeave={() => setHover({...hover, Three: 0})}
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
                    onMouseLeave={() => setHover({...hover, Four: 0})}
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
        <DropZoneFile handleFileUpload={handleFileUpload} dropzoneTitle={dropzoneTitle}/>
        </div>
      </form>
    </div>
  )
}

export default RatingForm 