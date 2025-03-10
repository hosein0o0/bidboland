import React, { Component } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleString from '../handleString'

export default class SideClose extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    this.setState(this.props.state)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props.state)
    }
  }
  render () {
    // data.items
    return (
      <ul className='list-items'>
        {this.state.data.map(
          (data, key) =>
            (this.props.handleRole(data) || this.state.vendor) && (
              <li className='itemCloseSide' key={key}>
                {/* <span className='dot'></span> */}
                {data.icon ? (
                  <span className='image-side'>{data.icon()}</span>
                ) : (
                  <span className='dot'></span>
                )}
                <ul className='list-hovered'>
                  <li className='item-list-hovered pl-1'>
                    {data.path ? (
                      <a href={data.path}>{handleString(data.name)}</a>
                    ) : (
                      <React.Fragment>
                        <span className='w-100 d-flex align-items-center'>
                          <span className='col p-0'>{handleString(data.name)}</span>
                          {data.items && data.items.length > 0 && (
                            <ArrowBackIosIcon className='p-1' />
                          )}
                        </span>
                        {data.items && data.items.length > 0 && (
                          <ul className='list-hovered-seond'>
                            {data.items.map(
                              (data2, key2) =>
                                (this.props.handleRole(data2) ||
                                  this.state.vendor) && (
                                  <li
                                    key={key2}
                                    className='item-list-hovered-second'
                                  >
                                    {data2.items ? (
                                      <React.Fragment>
                                        <span className='w-100 d-flex align-items-center'>
                                          <span className='col p-0'>
                                            {handleString(data2.ChName)}
                                          </span>
                                          <ArrowBackIosIcon className='p-1' />
                                        </span>
                                        <ul className='list-hovered-third'>
                                          {data2.items.map(
                                            (data3, key3) =>
                                              (this.props.handleRole(data3) ||
                                                this.state.vendor) && (
                                                <li
                                                  key={key3}
                                                  className='item-list-hovered-third'
                                                >
                                                  <a href={data3.path}>
                                                    {handleString(data3.ChName)}
                                                  </a>
                                                </li>
                                              )
                                          )}
                                        </ul>
                                      </React.Fragment>
                                    ) : (
                                      <a href={data2.path}>{handleString(data2.ChName)}</a>
                                    )}
                                  </li>
                                )
                            )}
                          </ul>
                        )}
                      </React.Fragment>
                    )}
                  </li>
                </ul>
              </li>
            )
        )}
      </ul>
    )
  }
}
