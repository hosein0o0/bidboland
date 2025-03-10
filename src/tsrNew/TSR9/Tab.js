import React from 'react'
import handleString from '../../handleString'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import handleCheckText from '../../handleCheckText'
import EditIcon from '@material-ui/icons/Edit'
const Tab = props => {
  const { state, data } = props
  const { tab } = state
  const parentState = props.props.state || {}
  const { select, edit_form } = parentState
  let state_edit = `${select}${props._key + 1}` === edit_form
  function handleClick() {
    let key = props._key
    const checkDisable = props.checkDisable
    if (!checkDisable) {
      let value = key + 1
      props.handleState({
        tab: value
      })
      props.props.handleState({ tab_9: value })
    }
  }
  // groups
  function HaveStar() {
    let { groups } = state
    let list = groups || []
    let value = handleString(data.value)
    const check = list.includes(value)
    return check
  }
  function HaveStarRead() {
    let value = handleString(data.value)
    const name_verifry = `${value}_author_verify`
    let verify = props.state[name_verifry]
    const check = handleCheckText(verify)
    return check
  }
  let star = HaveStar() ? true : false
  let star_read = HaveStarRead() ? true : false
  function handleShowStar() {
    let result = []
    if (state_edit) result.push(<EditIcon className='available_tab edit' />)
    else if (star_read) result.push(<StarIcon className='available_tab' />)
    else if (star) result.push(<StarBorderIcon className='available_tab' />)
    return result
  }
  const show_star = handleShowStar()
  const class_name = `label _haveBorderB ${tab === props._key + 1 ? 'active' : ''
    } ${props.checkDisable ? 'disabled' : ''} ${star || star_read || state_edit ? 'position-relative' : ''
    }`
  return (
    <span key={props._key} className={class_name.trim()} onClick={handleClick}>
      {show_star}
      {handleString(props.data.label)}
    </span>
  )
}
export default Tab
