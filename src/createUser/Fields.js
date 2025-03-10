import React, { Component } from 'react'
import SubField2 from './SubField2'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
export default class Fields extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sub2Heigth: 0,
      subfileds2: [],
      listSub2: {}
    }
  }
  componentDidMount () {
    this.handleShowSubField()
    let obj = this.props.functions
    obj[this.props.id] = this.handleSelctAll
    this.props.GetFunction(this.props.functions)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.handleListSub2()
    }
  }
  handleListSub2 = () => {
    const field = this.props.field
    if (field.subfields) {
      let listSub2 = this.state.listSub2
      field.subfields.forEach(_sub => {
        if (_sub.subfileds2) {
          listSub2[_sub.name] = _sub.subfileds2
        }
      })
      this.setState({ listSub2: listSub2 })
    }
  }
  handleSelctAll = check => {
    let Selected = this.props.Selected
    const field = this.props.field
    if (!check) {
      if (field.subfields) {
        field.subfields.forEach(subf => {
          Selected[subf.name] = 0
          if (subf.subfileds2) {
            subf.subfileds2.forEach(subf2 => {
              Selected[subf2.name] = 0
            })
          }
        })
      }
      this.setState({ [`${field.name}_management`]: false })
    }
    this.props.handleState('Selected', Selected)
    Selected[field.name] = check ? 1 : 0
  }
  handleCheckBox = status => {
    if (status) {
      return {
        icon: <CheckBoxRoundedIcon />,
        class: 'full'
      }
    } else {
      return {
        icon: <CheckBoxOutlineBlankRoundedIcon />,
        class: 'empty'
      }
    }
  }
  handleClick = e => {
    let Selected = this.props.Selected
    Selected[e.target.name] = e.target.checked ? 1 : 0
    this.props.handleState('Selected', Selected)
  }
  handleShowSubField = async () => {
    const { Selected, field } = this.props
    if (Selected[field.name]) {
      if (field.subfields) {
        let listSubfields = await Object.keys(field.subfields).map(data => {
          return field.subfields[data].name
        })
        await Object.keys(Selected).map(item => {
          if (listSubfields.includes(item)) {
            this.setState({
              [`${field.name}_management`]: true
            })
          }
          return true
        })
      }
    }
  }
  CheckSub2 = (e, sub) => {
    this.setState({
      [`${sub.name}_subfileds2`]: sub.subfileds2
    })
    if (!e.target.checked) {
      this.handleCheck(e, true, sub)
    }
  }
  handleCheck = (e, checksub2, sub) => {
    if (!e.target.checked) {
      let {
        Selected,
        accessList,
        parentId,
        id,
        field,
        handleState
      } = this.props
      let listParent = accessList[parentId]
      let obj = listParent.fields[id]
      let subfields = obj.subfields
      if (sub && checksub2) {
        if (sub.subfileds2) {
          sub.subfileds2.forEach(_sub => {
            Selected[_sub.name] = 0
          })
          handleState('Selected', Selected)
        }
      } else {
        if (subfields) {
          subfields.forEach(data => {
            Selected[data.name] = 0
            if (data.subfileds2) {
              data.subfileds2.forEach(_data => {
                Selected[_data.name] = 0
              })
            }
            handleState('Selected', Selected)
          })
        }
        this.setState({ [`${field.name}_management`]: false })
      }
    }
  }
  handleManagment = e => {
    const { field, Selected, handleState } = this.props
    const check = Selected[field.name]
    const { checked, name } = e.target
    if (check) {
      this.setState({
        [name]: checked ? 1 : 0,
        [`${field.name}_show`]: checked ? 1 : 0
      })
      let _obj = Selected
      _obj[`${field.name}_show`] = checked ? 1 : 0
      handleState('Selected', Selected)
    }
  }
  render () {
    const { field, Selected, handleState } = this.props
    return (
      <div className='field-access'>
        <div className='row m-0 align-items-center w-100'>
          <div className='col-xl-3 col-lg-4 col-md-6 col-12 px-1'>
            <input
              name={field.name}
              id={field.name}
              type='checkbox'
              onChange={e => this.handleClick(e)}
              onClick={e => this.handleCheck(e)}
              checked={Selected[field.name] ? true : false}
            />
            <label
              className={this.handleCheckBox(Selected[field.name]).class}
              htmlFor={field.name}
            >
              {this.handleCheckBox(Selected[field.name]).icon}
              {field.label}
            </label>
          </div>
          {field.subfields && field.subfields.length && (
            <div className='col-xl-3 col-lg-4 col-md-6 col-12 px-1'>
              <div
                className={`main-toggle ${
                  Selected[field.name] ? 'active' : ''
                }`}
              >
                <div className='p-0'>
                  <span>مدیریت</span>
                </div>
                <div
                  className={`toggle-button ${
                    Selected[field.name] ? 'active' : ''
                  }`}
                >
                  <label className='switch'>
                    <input
                      type='checkbox'
                      name={`${field.name}_management`}
                      onChange={e =>
                        // Selected[field.name] &&
                        this.handleManagment(e)
                      }
                      onClick={e => Selected[field.name] && this.handleCheck(e)}
                      checked={
                        Selected[field.name]
                          ? this.state[`${field.name}_management`] ||
                            Selected[`${field.name}_show`]
                          : false
                      }
                    />
                    <span className='slider'></span>
                  </label>
                </div>
                <div className='p-0'>
                  <span>مشاهده</span>
                </div>
              </div>
            </div>
          )}
          <div className='col-xl-6 col-lg-4 col-md-6 col-12'>
            <div className='w-100 row m-0'>
              {Selected[field.name] &&
              field.subfields &&
              this.state[`${field.name}_management`]
                ? field.subfields.map((sub, index) => (
                    <div className='w-auto m-1' key={index}>
                      <input
                        name={sub.name}
                        id={sub.name}
                        type='checkbox'
                        onChange={e => this.handleClick(e)}
                        onClick={e =>
                          sub.subfileds2 ? this.CheckSub2(e, sub) : null
                        }
                        checked={
                          Selected[sub.name] ? Selected[sub.name] : false
                        }
                      />
                      <label
                        className={Selected[sub.name] ? 'full' : 'empty'}
                        htmlFor={sub.name}
                      >
                        {this.handleCheckBox(Selected[sub.name]).icon}
                        {sub.label}
                      </label>
                    </div>
                  ))
                : ''}
            </div>
          </div>
          <div className='w-100'>
            {Object.keys(this.state.listSub2).map(_sub2 =>
              Selected[_sub2] === '1' || Selected[_sub2] === 1 ? (
                <div
                  className='col-12 main_sub2 row m-0 pt-1'
                  style={{ height: `auto` }}
                >
                  <div className='subfield2'>
                    <SubField2
                      data={this.state.listSub2[_sub2]}
                      Selected={Selected}
                      handleState={handleState}
                      handleCheckBox={this.handleCheckBox}
                      handleClick={this.handleClick}
                    />
                  </div>
                </div>
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </div>
    )
  }
}
