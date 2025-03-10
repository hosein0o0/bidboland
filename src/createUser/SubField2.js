import React, { Component } from 'react'
export default class SubField2 extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const MainData = this.props.data
    return (
      <div className='w-100 pt-1 pb-1 row m-0'>
        {MainData && MainData.length >= 0
          ? MainData.map((data, key) => (
              <div className='w-auto mt-1 mb-1 mr-2 ml-2' key={key}>
                <input
                  name={data.name}
                  id={data.name}
                  type='checkbox'
                  onChange={e => this.props.handleClick(e)}
                  checked={this.props.Selected[data.name]}
                />
                <label
                  className={
                    this.props.handleCheckBox(this.props.Selected[data.name])
                      .class
                  }
                  htmlFor={data.name}
                >
                  {
                    this.props.handleCheckBox(this.props.Selected[data.name])
                      .icon
                  }
                  {data.label}
                </label>
              </div>
            ))
          : ''}
      </div>
    )
  }
}
