import React, { Component } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded'
import Fields from './Fields'
import Exception from './Exception'
export default class Accsess extends Component {
  constructor (props) {
    super(props)
    this.functions = {}
    this.PropsSelect = null
    this.state = {
      totalCounter: 0
      // getState: {}
      // totalCounter: 0
    }
  }
  componentDidMount () {
    this.props.getCounter(this.CheckCounter)
    this.CheckCounter()
  }

  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      this.CheckCounter()
    }
  }
  CheckCounter = () => {
    let totalCounter = 0
    const { data, Selected } = this.props
    if (this.handleArray(data).array) {
      let filter = Object.keys(this.handleArray(data).array).map(value => {
        return this.handleArray(data).array[value].name
      })
      Object.keys(Selected).map(obj => {
        if (filter.includes(obj)) {
          if (Selected[obj]) {
            totalCounter++
          }
        }
        return true
      })
    }
    this.setState({ totalCounter: totalCounter })
  }
  SelectAll = e => {
    if (this.PropsSelect !== null) {
      const { data } = this.props
      const { checked } = e.target
      const length = this.handleArray(data).array
        ? this.handleArray(data).array.length
        : 0
      if (checked) {
        this.setState({ totalCounter: length })
      } else {
        this.setState({ totalCounter: 0 })
      }
      for (let value in this.PropsSelect) {
        let f = this.PropsSelect[value]
        if (f) f(checked)
      }
    }
  }
  handleCheckBox = () => {
    const { data } = this.props
    const { totalCounter } = this.state
    switch (totalCounter) {
      case 0:
        return {
          icon: <CheckBoxOutlineBlankRoundedIcon />,
          className: 'empty'
        }
      case this.handleArray(data).array.length:
        return {
          icon: <CheckBoxRoundedIcon />,
          className: 'full'
        }
      default:
        return {
          icon: <IndeterminateCheckBoxRoundedIcon />,
          className: 'half'
        }
    }
  }
  handleArray = data => {
    const { subfields, fields } = data
    let result = {
      array: [],
      status: ''
    }
    if (fields) {
      result = {
        array: fields,
        status: 'fields'
      }
    } else if (subfields) {
      result = {
        array: subfields,
        status: 'subfields'
      }
    }
    return result
  }
  handleShowArray = data => {
    const { array, status } = this.handleArray(data)
    const { accessList, Selected, handleState, id } = this.props
    switch (status) {
      case 'fields':
        return array.map((field, key) =>
          field.divider ? (
            <div className='title-access'>
              <h3 className='text-title'>{field.label}</h3>
              <div className='line col pl-0'></div>
            </div>
          ) : (
            <Fields
              key={key}
              field={field}
              name={data.name}
              parentId={id}
              accessList={accessList}
              id={key}
              GetFunction={e => (this.PropsSelect = e)}
              functions={this.functions}
              Selected={Selected}
              handleState={handleState}
            />
          )
        )
      case 'subfields':
        return <Exception {...this} array={array} />
    }
  }
  render () {
    const { data, id, handleTotal } = this.props
    return (
      <div className='main-from-access'>
        <div className='select-all'>
          <div className='col d-flex'>
            <input
              id={`all_${id}`}
              type='checkbox'
              onChange={this.SelectAll}
              checked={
                this.state.totalCounter === this.handleArray(data).array
                  ? this.handleArray(data).array.length
                  : 0
              }
            />
            <label
              className={this.handleCheckBox().className}
              htmlFor={`all_${id}`}
            >
              {this.handleCheckBox().icon}
              انتخاب همه
            </label>
          </div>
          <div className='num-selected pl-3'>
            {handleTotal() > 0 && (
              <span className='IranSans_Bold'>
                {handleTotal()} مورد انتخاب شده
              </span>
            )}
          </div>
        </div>
        {this.handleShowArray(data)}
      </div>
    )
  }
}
