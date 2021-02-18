import React from 'react'
import { Popover, Button, Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const PerformanceTile = ({ performance, performanceDelete }) => {
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    return performanceDelete(performance.id)
  }

  const content = (
    <div>
      <p>Stage Presence: {performance.stagePresence}</p>
      <p>Vocals: {performance.vocalPerformance}</p>
      <p>Audience Reaction: {performance.audienceReaction}</p>
      <p># of "Beverage": {performance.numOfDrinks}</p>
      <p>Notes: {performance.notes}</p>
      <p>{performance.videoFile}</p>
    </div>
  )
  
  performance.createdAt = performance.createdAt.substring(0, 10)

  return (
    <div style={{ whiteSpace: 'wrap', color: '#ff7a45'  }}  className='popover-div'>
      <Popover content={content} title="Ratings:" trigger="hover">
          <Button >{performance.createdAt} - {performance.venue}</Button>
      </Popover> 
      <Popconfirm 
        title="Are you sure？" 
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