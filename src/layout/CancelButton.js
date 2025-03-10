import React, { useState } from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { Redirect } from 'react-router-dom'
import Loading from './loading'
function CancelButton (props) {
  const [redirect, setRedirect] = useState(false)
  const [load, SetLoad] = useState(false)
  const [disabled, setDisabled] = useState(false)
  function handleRedirect () {
    if (props.status && props.redirect) {
      setRedirect(true)
    }
  }
  function handleShow () {
    let array = []
    if (props.redirect) {
      array.push(
        <a href={`/${props.redirect}`} className='align-items-center d-flex'>
          <CloseRoundedIcon />
          انصراف
        </a>
      )
    } else {
      array.push(
        <React.Fragment>
          {load ? <Loading className='form-loader' /> : <CloseRoundedIcon />}
          انصراف
        </React.Fragment>
      )
    }
    return array
  }
  async function handleClick () {
    if (props.status) {
      handleRedirect()
    } else if (props.fn) {
      await SetLoad(true)
      await setDisabled(true)
      let func = await props.fn
      let result = await func()
      let checkTrue =await result?.status === 200
      await setTimeout(
        async () => {
          await SetLoad(false)
          if (checkTrue) {
            window.location.reload(true)
          }
          setDisabled(false)
        },
        checkTrue ? 5000 : 1
      )
    }
  }
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/${props.redirect}`,
          state: { select: props.status }
        }}
      />
    )
  } else {
    return (
      <button
        onClick={handleClick}
        className='continue mr-3'
        disabled={disabled}
      >
        {handleShow()}
      </button>
    )
  }
}
export default CancelButton
