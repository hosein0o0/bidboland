import React from 'react'
import Head from './head'
import CreateNote from './Create'
import List from './List'
import HOC from './HOC'
import Show from './Show'
const NoteTsr = props => {
  // const [stateShow, setStateShow] = useState('list')
  // const myProps = { stateShow, setStateShow, ...props }
  const { stateShow } = props
  const manageShow = () => {
    switch (stateShow) {
      case 'list':
        return <List {...props} />
      case 'create':
        return <CreateNote {...props} />
      case 'show':
        return <Show {...props} />
      default:
        break
    }
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-6 col-lg-6 col-md-8 col-12'>
        <div className='box-note'>
          <Head {...props} />
          {manageShow()}
        </div>
      </div>
    </div>
  )
}
export default HOC(NoteTsr)
