import React from 'react'
import { Link } from 'react-router-dom'
import { Popconfirm } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Card = ({text, link, linkText, songDelete}) => {
  
  const handleDeleteClick = (event) => {
    event.preventDefault()
    return songDelete(song.id)
  }

  return(
    <div className="option-card">
        <div className='toggle-btn'>
          <h6><Link to='/go-tos' className='go-to-link'>Add to Go-To List!</Link></h6>
          {text}
        </div>
        {/* <div className='delete-span'>
         <h6>Delete?</h6>
          <Popconfirm 
            title= "Delete song and all performances?" 
            okText="Yes" 
            cancelText="No"  
            onConfirm={handleDeleteClick}
          >
            <a href="#"> 
              <FontAwesomeIcon icon={faTrashAlt} id='card-trash-icon' />
            </a>
          </Popconfirm>
        </div> */}
    </div>
  )
}

export default Card