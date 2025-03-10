import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import InboxRoundedIcon from '@material-ui/icons/InboxRounded'
import MoveToInboxRoundedIcon from '@material-ui/icons/MoveToInboxRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded'
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded'
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import SettingsIcon from '@material-ui/icons/Settings'
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      ListItem: [
        { name: 'search', label: 'جستجو', icon: () => <SearchIcon /> },
        {
          name: 'inbox',
          label: 'دریافتی‌ها',
          icon: () => <InboxRoundedIcon />
        },
        {
          name: 'posts',
          label: 'ارسال شده‌ها',
          icon: () => <MoveToInboxRoundedIcon />
        },
        {
          name: 'bookmark',
          label: 'نشان شده‌ها',
          icon: () => <StarRoundedIcon />
        },
        {
          name: 'archive',
          label: 'آرشیوها',
          icon: () => <ArchiveRoundedIcon />
        },
        {
          name: 'spam',
          label: 'اسپم‌ها',
          icon: () => <AnnouncementRoundedIcon />
        },
        {
          name: 'drafts',
          label: 'پیش نویس ها',
          icon: () => <BorderColorRoundedIcon />
        }
      ]
    }
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    if (this.refs.container && !this.refs.container.contains(event.target)) {
      this.setState({
        open: false
      })
    }
  }
  handleSelect = name => {
    const check = name === this.props.state.select
    this.props.handleState('select', check ? '' : name)
  }
  handleParentState = async name => {
    await this.props.handleState(name, true)
    await this.setState({ open: false })
  }
  render () {
    const { ListItem, open } = this.state
    return (
      <div className='header-email'>
        <div className='row mx-0 w-100 py-2 align-items-center'>
          <div className='col'>
            <div className='main-item-email row mx-0'>
              {ListItem.map((data, key) => (
                <div
                  key={key}
                  className={`item-email pointer ${
                    this.props.state.select === data.name ? 'active' : ''
                  }`}
                  onClick={() => this.handleSelect(data.name)}
                >
                  {data.icon()}
                  <span className='d-block'>{data.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`handleNameEmail ${open ? 'active' : ''}`}
            ref='container'
          >
            <div
              className='firstDetail ltr'
              onClick={() => this.setState({ open: !open })}
            >
              <span className='rtl w-100'>
                <KeyboardArrowDownRoundedIcon className='ml-1 arrow' />
                <span className='col p-0 justify-content-end'>
                  develope2@Rieco.ir
                  <EmailRoundedIcon className='mr-1' />
                </span>
              </span>
            </div>
            {open && (
              <div className='managmentBox-Email'>
                <div className='list-email ltr'>
                  <span>develope2@Rieco.ir</span>
                </div>
                <div className='list-email ltr'>
                  <span>develope@Rieco.ir</span>
                </div>
                <div className='main-button'>
                  <div className='row mx-0'>
                    <div className='col-6 pr-0 pl-1'>
                      <button
                        className='add pointer'
                        onClick={() => this.handleParentState('addEmail')}
                      >
                        <AddCircleRoundedIcon className='ml-1' />
                        افزودن ایمیل
                      </button>
                    </div>
                    <div className='col-6 pr-1 pl-0'>
                      <button
                        className='remove pointer'
                        onClick={() => this.handleParentState('delete')}
                      >
                        <DeleteRoundedIcon className='ml-1' />
                        حذف ایمیل
                      </button>
                    </div>
                    <div className='w-100'>
                      <button className='manageEmail justify-content-center text-center pointer'>
                        <SettingsIcon className='ml-1' />
                        مدیریت ایمیل‌ها
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
