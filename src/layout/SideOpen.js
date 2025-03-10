import React, { Component } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleString from '../handleString'
// import { a } from 'react-router-dom'
// import { ThreeSixtyOutlined } from '@material-ui/icons';
import StarIcon from '@material-ui/icons/Star'
export default class SideOpen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      key: 0,
      key2: '',
      keySelect: 0,
      key2Select: '',
      data: []
    }
  }
  async componentDidMount () {
    this.setState(this.props.state)
    this.props.getThis(this)
  }
  Check = async () => {
    if (this.props.props.resetStatus) {
      await this.ResetStatus()
    } else {
      await this.handleCheckStatus()
    }
  }
  ResetStatus = () => {
    this.setState({
      key: 0,
      key2: ''
    })
    localStorage.removeItem('key')
    localStorage.removeItem('key2')
  }
  handleCheckStatus = () => {
    let key = localStorage.getItem('key'),
      key2 = localStorage.getItem('key2')
    if (key) {
      this.setState({ keySelect: parseInt(key) })
      this.handleOpen(parseInt(key))
      if (key2) {
        this.setState({ key2Select: parseInt(key2) })
        this.handleOpen2(parseInt(key2))
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props.state)
    }
  }
  handleOpen = async num => {
    if (this.refs[`child_${num}`]) {
      if (this.state.key === num) {
        if (this.state.height === 'auto') {
          this.setState({
            height: `calc(${this.refs[`child_${num}`].offsetHeight}px + 4em)`
          })
        }
        setTimeout(() => {
          this.setState({
            key: '',
            key2: '',
            height: '4em'
          })
          localStorage.setItem('key', '')
          localStorage.setItem('key2', '')
        }, 1)
      } else {
        await this.setState({
          key: num,
          key2: '',
          key2Select: '',
          height: !this.state.height
            ? `calc(${this.refs[`child_${num}`].offsetHeight}px + 4em)`
            : 'auto'
        })
        localStorage.setItem('key', num)
        localStorage.setItem('key2', '')
      }
    }
  }
  handleOpen2 = async num => {
    if (this.state.key2 === num) {
      await this.setState({
        key2: '',
        height: 'auto'
      })
      // await localStorage.setItem('key2', '');
    } else {
      await this.setState({ key2: num, height: 'auto' })
      await localStorage.setItem('key2', num)
    }
  }
  handleHeight2 = num => {
    if (
      this.state.key2 !== '' &&
      this.refs[`child_${num}_${this.state.key2}`]
    ) {
      return this.refs[`child_${num}_${this.state.key2}`].offsetHeight
    } else return 0
  }
  handleCrsip = data => {
    if (data.crsip) {
      this.props.handleSupport()
    }
  }
  render () {
    return (
      <ul className='list-items'>
        {this.state.data.map(
          (data, key) =>
            (this.props.handleRole(data) || this.state.vendor) && (
              <li
                className={
                  data.path && key === this.state.keySelect ? 'active' : ''
                }
                style={{
                  height:
                    this.state.key === key ? `${this.state.height}` : '4em'
                }}
                key={key}
              >
                {data.path ? (
                  <React.Fragment>
                    {data.icon ? (
                      <span className='image-side'>{data.icon()}</span>
                    ) : (
                      <span className='dot'></span>
                    )}
                    <a href={data.path}>{data.name}</a>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span
                      className={`label-items`}
                      onClick={() => this.handleOpen(key)}
                    >
                      {data.icon ? (
                        <span className='image-side'>{data.icon()}</span>
                      ) : (
                        <span className='dot'></span>
                      )}
                      <span className='col p-0'>{data.name}</span>
                      {data.items.length > 0 ? (
                        <ArrowBackIosIcon
                          className={`left-icon ${
                            this.state.key === key ? 'active' : ''
                          }`}
                        />
                      ) : (
                        ''
                      )}
                    </span>
                    {data.items.length > 0 ? (
                      <ul
                        className={`child ${
                          this.state.key === key ? 'active' : ''
                        }`}
                        ref={`child_${key}`}
                      >
                        {data.items.map(
                          (item, index) =>
                            (this.props.handleRole(item) ||
                              this.state.vendor) && (
                              <li
                                key={index}
                                style={{
                                  height:
                                    this.state.key2 === index &&
                                    this.state.key !== ''
                                      ? `calc(${this.handleHeight2(
                                          key
                                        )}px + 3em)`
                                      : '3em'
                                }}
                                className={`${
                                  data.path && index === this.state.key2Select
                                    ? 'active'
                                    : ''
                                }${item.disabled ? '_disabled' : ''}`}
                              >
                                <span
                                  className={`circle-pointer ${
                                    item.disabled ? '_disabled' : ''
                                  }`}
                                ></span>
                                {item.path ? (
                                  <a href={item.path}>
                                    {handleString(item.ChName)}
                                  </a>
                                ) : (
                                  <React.Fragment>
                                    <span
                                      className='label-items'
                                      onClick={() => this.handleOpen2(index)}
                                    >
                                      <span className='col p-0'>
                                        {handleString(item.ChName)}
                                      </span>
                                      <ArrowBackIosIcon
                                        className={`left-icon ${
                                          this.state.key2 === index
                                            ? 'active'
                                            : ''
                                        }`}
                                      />
                                    </span>
                                    {item.items && item.items.length > 0 ? (
                                      <ul
                                        className='child'
                                        ref={`child_${key}_${index}`}
                                      >
                                        {item.items.map(
                                          (item2, index2) =>
                                            (this.props.handleRole(item2) ||
                                              this.state.vendor) && (
                                              <li
                                                key={index2}
                                                onClick={() =>
                                                  item2.crsip &&
                                                  this.handleCrsip(item2)
                                                }
                                              >
                                                <span className='circle-pointer'></span>
                                                {item2.crsip ? (
                                                  handleString(item2.ChName)
                                                ) : (
                                                  <a
                                                    className={
                                                      item2._new
                                                        ? 'd-block'
                                                        : ''
                                                    }
                                                    href={item2.path}
                                                  >
                                                    {handleString(item2.ChName)}
                                                    {item2._new && (
                                                      <StarIcon className='_star_new' />
                                                    )}
                                                  </a>
                                                )}
                                              </li>
                                            )
                                        )}
                                      </ul>
                                    ) : (
                                      ''
                                    )}
                                  </React.Fragment>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    ) : (
                      ''
                    )}
                  </React.Fragment>
                )}
              </li>
            )
        )}
      </ul>
    )
  }
}
// export default SideOpen
