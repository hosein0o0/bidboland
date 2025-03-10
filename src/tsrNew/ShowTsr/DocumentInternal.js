import React, { Component } from 'react'
import handleString from '../../handleString'
import BoxResultDocument from './BoxResultDocument'
export default class DocumentInternal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    const { _key , handleState} = this.props
    const elm = this.refs[`doc_${_key}`]
    if (elm && !elm.contains(event.target)) {
      this.setState({
        open: false
      })
      handleState({
        // listData: [],
        loading: ''
      })
    }
  }
  handleChange = (e, nameObj, key, nameParent) => {
    let { handleSearchDocument } = this.props.API
    const fun = handleSearchDocument
    if (fun) {
      const { value } = e.target
      let list = this.props.list || []
      let obj = list[key]
      obj[nameObj] = handleString(value)
      obj['_selected'] = false
      this.props.handleState({
        [nameParent]: list
      })
      fun(handleString(value))
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleBlur = nameParent => {
    let list = this.props.list || []
    let length = list.length
    let end = list[length - 1] || {}
    const { OnBlur } = this.props
    if (!end._selected) {
      end['documentNumber'] = ''
      end['degreeTitle'] = ''
      end['_selected'] = false
      end['revision'] = ''
      end['transmitallNumber'] = ''
      list[length - 1] = end
      this.props.handleState({
        [nameParent]: list
      })
    }
    OnBlur()
  }
  render () {
    const {
      handleClassName,
      canCreate,
      nameParent,
      _key,
      data,
      OnFocus,
      // OnBlur,
      // handleState
    } = this.props
    return (
      <div
        className='col-xl-6 col-lg-6 col-md-12 col-12 position-relative'
        ref={`doc_${_key}`}
        onClick={() =>
          this.setState({
            open: canCreate ? `doc_${_key}` : ''
          })
        }
      >
        <div
          className={`field-form overflow-initial ${
            handleClassName('documentNumber') ? 'active' : ''
          } `}
        >
          <div className='col-12 p-0 ltr'>
            <label>Document Number</label>
            <input
              className='text-left ltr'
              type='text'
              name={`${nameParent}__documentNumber__${_key}`}
              value={handleString(data.documentNumber)}
              onFocus={e => (canCreate ? OnFocus(e.target.name) : '')}
              onBlur={() => this.handleBlur(nameParent)}
              onChange={e =>
                this.handleChange(e, 'documentNumber', _key, nameParent)
              }
              disabled={!canCreate}
              readOnly={!canCreate}
            />
          </div>
          {this.state.open === `doc_${_key}` && (
            <BoxResultDocument {...this} value={data.documentNumber} />
            )} 
        </div>
      </div>
    )
  }
}
