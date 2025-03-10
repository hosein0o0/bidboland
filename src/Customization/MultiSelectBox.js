import React, { Component } from 'react'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import Cookies from 'js-cookie'
import ItemMultiSelect from './ItemMultiSelect'
export default class MultiSelectBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      open: true,
      list: [],
      select: ''
    }
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      if (this.props.state[`${this.props.name}_list`]) {
        this.setState({
          list: this.props.state[`${this.props.name}_list`]
        })
      }
    }
  }
  handleClickOutside = event => {
    if (
      this.refs[this.props.name] &&
      !this.refs[this.props.name].contains(event.target)
    ) {
      this.setState({
        open: false
      })
    }
  }
  handleShow = () => {
    const list = Object.keys(this.props.state[this.props.name]).map(item => {
      if (item !== 'selected') {
        return this.props.state[this.props.name][item]
      }
    })
    return list
  }
  render () {
    return (
      <div className='main-multiselectbox'>
        <div
          className='box-multiselectbox'
          onClick={() => this.setState({ open: this.props.name })}
          ref={this.props.name}
        >
          <div className='w-100 d-flex'>
            <label className='box-multiselectbox-label'>
              {this.props.tilte}
              <span className='star'>*</span>
            </label>
            <div className='item-selected row mx-0'>
              {this.state.list.map((item, index) => (
                <span key={index}>{item.label}</span>
              ))}
            </div>
            <div
              className={`icon  d-flex justify-content-center align-items-center ${
                this.state.open === this.props.name ? 'active' : ''
              }`}
            >
              <ArrowDropDownRoundedIcon />
            </div>
          </div>
          {this.state.open === this.props.name && (
            <div className='multiselectbox-box-result'>
              <div className='row mx-0'>
                {this.handleShow().map((data, key) => (
                  <ItemMultiSelect
                    data={data}
                    key={key}
                    _key={key}
                    {...this}
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
