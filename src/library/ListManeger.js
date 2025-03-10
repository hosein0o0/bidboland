import React, { Component } from 'react'
// import SettingsIcon from '@material-ui/icons/Settings'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
// import BuildIcon from '@material-ui/icons/Build'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import PublicRoundedIcon from '@material-ui/icons/PublicRounded'
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded'
export default class ListManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boxes: [
        {
          text: 'ثبت مدرک',
          icon: e => <AddCircleRoundedIcon style={{ fill: e }} />,
          backColor: '#ffebed',
          textColor: '#f44236',
          path: `/document-registration`,
          target: '_blank',
          permission: ['']
        },
        {
          text: 'نویسندگان',
          icon: e => <CreateRoundedIcon style={{ fill: e }} />,
          backColor: '#f3e5f6',
          textColor: '#9c28b1',
          path: `/index-writers`,
          target: '_blank',
          permission: ['']
        },
        {
          text: 'ناشرین',
          icon: e => <PublicRoundedIcon style={{ fill: e }} />,
          backColor: '#e8eaf6',
          textColor: '#3f51b5',
          path: `/index-publishers`,
          target: '_blank',
          permission: ['']
        },
        {
          text: 'استانداردهای درخواستی',
          icon: e => <LiveHelpRoundedIcon style={{ fill: e }} />,
          backColor: '#e8eaf6',
          textColor: '#3f51b5',
          path: `/requested-standard`,
          target: '_blank',
          permission: ['']
        }
      ],
      number: null
    }
  }
  render () {
    return this.state.boxes.map(
      (box, key) => (
        // this.props.handleCheckRole(box.permission) && (
        <div
          key={key}
          className='col-xl-3 col-lg-4 col-md-6 col-12 p-2 main-box'
        >
          <a
            className='link-box-dashboard'
            href={box.path ? box.path : '#'}
            target={box.target ? box.target : ''}
            rel='noreferrer'
          >
            <div
              className='box-dashboard'
              style={
                this.state.number === key
                  ? { backgroundColor: box.backColor }
                  : null
              }
              onMouseOver={() => this.setState({ number: key })}
              onMouseOut={() => this.setState({ number: null })}
            >
              <div className='row m-0'>
                <div className='icon-box'>
                  {box.icon(
                    this.state.number === key ? box.textColor : '#363636'
                  )}
                </div>
                <div className='text-box'>
                  <span
                    className='IranSans_Bold'
                    style={
                      this.state.number === key
                        ? { color: box.textColor }
                        : null
                    }
                  >
                    {box.text}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      )
      // )
    )
  }
}
