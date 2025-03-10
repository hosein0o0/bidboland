import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function ListFiled (props) {
  let obj = props.state[props.name] ? props.state[props.name] : {}
  function handleChange (e) {
    obj[e.target.name] = handleString(e.target.value)
    props.handleState(props.name, obj)
  }
  function handleAdd () {
    let array = props.state[props.nameList]
    if (array) {
      //   let obj = props.state[props.name]
      if (obj) {
        array.push(obj)
        props.handleState(props.nameList, array)
        props.handleState(props.name, { text: '', title: '' })
      }
    }
  }
  return (
    <div className='w-100 rtl row mx-0 my-2'>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `title${props.name}` ||
            handleCheckText(obj.title)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>عنوان</label>
            <input
              name='title'
              value={handleString(obj.title)}
              onFocus={() => props.OnFocus(`title${props.name}`)}
              onBlur={props.OnBlur}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === `text${props.name}` ||
            handleCheckText(obj.text)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>توضیحات</label>
            <textarea
              name='text'
              value={handleString(obj.text)}
              onFocus={() => props.OnFocus(`text${props.name}`)}
              onBlur={props.OnBlur}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='button-add col-12'>
        <button className='pr-2 pl-2 w-auto' onClick={handleAdd}>
          <AddIcon />
          افزودن (Ent)
        </button>
      </div>
    </div>
  )
}
export default ListFiled
