import React from 'react'
import spin from './spin.gif'

export default () => {
  return (
    <div>
      <img
        src={spin}
        alt="Loading..."
        style={{ width: '200px', margin: '40px auto', display: 'block' }}
      />
    </div>
  )
}