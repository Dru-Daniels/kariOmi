import React, {useState} from 'react'
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
    stagePresence: "",
    vocalPerformance: "",
    audienceReaction: "",
    numOfDrinks: "",
    venue: "",
    notes: "",
    videoFile: "",
    songId: songId
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    postNewPerformance(performance)
    clearForm()
    
  }
  
  const clearForm = () => {
    setPerformance({
      stagePresence: "",
      vocalPerformance: "",
      audienceReaction: "",
      numOfDrinks: "",
      venue: "",
      notes: "",
      videoFile: ""
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
          <h4>Stage Presence:</h4>
          <div className='wrap-icons'>
              {[...Array(5)].map((star, i) => {
                const ratingValue = (i + 1)
                return (
                  <label key={i + 1}>
                    <input
                      className='radio'
                      type="radio"
                      name="stagePresence"
                      value={ratingValue}
                      onClick={handleInputChange}
                      />
                    <FaFireAlt
                      className="star"
                      color={ratingValue <= (hover.One || performance.stagePresence) ? "#f56201" : "#e4e5e9"}
                      size={20}
                      onMouseEnter={() => setHover({...hover, One: ratingValue})}
                      onMouseLeave={() => setHover({...hover, One: null})}
                    />
                  </label>
                )
              })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4>Vocal Performance:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i+1}>
                  <input
                    className='radio'
                    type="radio"
                    name="vocalPerformance"
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover.Two || performance.vocalPerformance) ? "#f6d633" : "#e4e5e9"}
                    size={20}
                    onMouseEnter={() => setHover({...hover, Two: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Two: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4>Audience Reaction:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i+1}>
                  <input
                    className='radio'
                    type="radio"
                    name="audienceReaction"
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaThumbsUp
                    className="star"
                    color={ratingValue <= (hover.Three || performance.audienceReaction) ? "#f20c90" : "#e4e5e9"}
                    size={20}
                    onMouseEnter={() => setHover({...hover, Three: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Three: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <div className='icon-rating-container'>
          <h4>Number of Drinks:</h4>
          <div className='wrap-icons'>
            {[...Array(5)].map((star, i) => {
              const ratingValue = (i + 1)
              return (
                <label key={i + 1}>
                  <input
                    className='radio'
                    type="radio"
                    name="numOfDrinks"
                    value={ratingValue}
                    onClick={handleInputChange}
                    />
                  <FaBeer
                    className="star"
                    color={ratingValue <= (hover.Four || performance.numOfDrinks) ? "#6f84d1" : "#e4e5e9"}
                    size={20}
                    onMouseEnter={() => setHover({...hover, Four: ratingValue})}
                    onMouseLeave={() => setHover({...hover, Four: null})}
                  />
              </label>
              )
            })}
          </div>
        </div>

        <label className='button-group' >Venue:
          <input 
            type='text' 
            name='venue' 
            value={performance.venue} 
            onChange={handleInputChange} 
            placeholder=''
          />
        </label>

        <label className='button-group' >Notes:
          <input 
            type='text' 
            name='notes' 
            value={performance.notes} 
            onChange={handleInputChange} 
            placeholder='Anything interesting happen?'
          />
        </label>
        <label className='button-group' >Video:
          <input 
            type='text' 
            name='videoFile' 
            value={performance.videoFile} 
            onChange={handleInputChange} 
            placeholder='Drag and Drop Your Video File Here'
          />
        </label>
        <div>
          <input 
            className='primary-btn' 
            id='primary-btn' 
            type='submit' 
            className='button'  
            value='submit' 
          />
        </div>
      </form>
    </div>
  )
}

export default RatingForm 