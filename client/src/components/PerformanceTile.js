import React from 'react'
import { Popover, Button, Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaBeer, FaStar, FaFireAlt, FaThumbsUp, FaEdit } from 'react-icons/fa'

const PerformanceTile = ({ performance, performanceDelete }) => {
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    return performanceDelete(performance.id)
  }

  const vidDiv = (
    <div className='performance-vid'>
      <video autoPlay playsInline muted width="100px" height="100px" controls>
        <source src={performance.videoFile}/>
      </video>
    </div>
  )
  const vid = performance.videoFile.length > 3 ? vidDiv : null
  
  const content = (
    <div className='popover-container'>                    
      <p><FaFireAlt color={'#f56201'}/> Stage Presence: {performance.stagePresence}</p>
      <p><FaStar color={'#f56201'}/> Vocals: {performance.vocalPerformance}</p>
      <p><FaThumbsUp color={'#f56201'}/> Audience Reaction: {performance.audienceReaction}</p>
      <p><FaBeer color={'#f56201'}/> # of "Beverage": {performance.numOfDrinks}</p>
      <span>{vid}</span>
      <p><FaEdit color={'#f56201'}/> Notes: {performance.notes}</p>
      
    </div>
  )

  performance.createdAt = performance.createdAt.substring(0, 10)
  const title = `Rating: ${performance.performanceScore}`

  return (
    <div style={{ whiteSpace: 'wrap', color: '#ff7a45'  }}  className='popover-div'>
      <Popover content={content} title={title} trigger="hover">
          <Button >{performance.createdAt} - {performance.venue}</Button>
      </Popover> 
      <Popconfirm 
        title= "This will delete all ratings and videos for this performance" 
        okText="Yes" 
        cancelText="No"  
        onConfirm={handleDeleteClick}
      >
        <a href="#"> 
          <FontAwesomeIcon icon={faTrashAlt} id='trash-icon' />
        </a>
      </Popconfirm>
      <div className='add-space'></div>
    </div>
  )
}

export default PerformanceTile