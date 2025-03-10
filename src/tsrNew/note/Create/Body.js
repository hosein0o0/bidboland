import React from 'react'
import ToCC from './ToCC'
import TextNote from './text'
import Files from './files'
const Body = props => {
  const myProps = { ...props }
  const { attachment } = props.state
  return (
    <div className='body-note'>
      <ToCC {...props} />
      <TextNote {...myProps} />
      {attachment?.length > 0 && <Files {...props} />}
    </div>
  )
}
export default Body
