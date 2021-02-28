import React from 'react'
import { Popconfirm } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Card = ({aboveText, toggleBtn, songDelete,}) => {
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    return songDelete()
  }

  return(
    <div className="option-card">
        <div className='toggle-btn'>
          {aboveText}
          {toggleBtn}
        </div>
        <div className='delete-span'>
         <h6>Delete?</h6>
          <Popconfirm 
            title= "Delete song and all saved performances?" 
            okText="Yes" 
            cancelText="No"  
            onConfirm={handleDeleteClick}
          >
            <a href="#"> 
              <FontAwesomeIcon icon={faTrashAlt} id='card-trash-icon' />
            </a>
          </Popconfirm>
        </div>
    </div>
  )
}

export default Card