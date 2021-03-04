import React from 'react'
import { Spin, Alert } from 'antd'

const Spinner = ({spin, alertMessage}) => {
  return(
    <>
      {spin === true ? (
        <Spin>
          <Alert message={alertMessage}></Alert>
        </Spin>
      ) : (
        <span></span>
      )}
    </>
  )
}

export default Spinner