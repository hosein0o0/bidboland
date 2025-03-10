import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
import StaticData from '../staticData'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
import SearchTable from '../table/SearchTable'
import DocumentControlCenter from './DocumentControlCenter/DocumentControlCenter'
export default class EngineeringManagement extends Component {
    constructor(props) {
        super(props)
        this.Search = null
        this.Permision = new Permision()
        this.Reset = null
        this.FilterReset = null
        this.state = {
            token: Cookies.get('token'),
            header: [],
            selected: [],
            open: false,
            search: '',
            select: 1,
            accessTab: true,
            defaultSelected: [],
            num: 0
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - آرشیو فنی شناسنامه`
        document.addEventListener('mousedown', this.handleClickOutside)
        setTimeout(async () => {
            this.state.header.forEach(head => {
                if (!head.notDefault) {
                    this.setState({
                        [`_header_${head.name}`]: true,
                        selected: [...this.state.selected, head.name]
                    })
                }
            })
        }, 50)
    }
    handleState = (obj) => {
        this.setState(obj)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    loadCheck = async () => {
        await this.setState({ selected: [] })
        await Object.keys(this.state).map(value => {
            if (value.includes('_header_')) {
                this.setState({ [value]: false })
            }
            return true
        })
        await this.state.header.forEach(head => {
            if (!head.notDefault) {
                this.setState({
                    [`_header_${head.name}`]: true,
                    selected: [...this.state.selected, head.name]
                })
            }
        })
    }
    handleSelect = async (checked, name) => {
        if (this.state.selected.length > 1 || checked) {
            await this.setState({ [name]: checked })
            let array = []
            for (let value in this.state) {
                if (value.includes('_header_')) {
                    if (this.state[value]) {
                        let _name = value.split('_header_')[1]
                        array.push(_name)
                    }
                }
            }
            await this.setState({ selected: array })
        }
    }
    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open
            }
        })
    }
    handleClickOutside = event => {
        if (this.refs.container && !this.refs.container.contains(event.target)) {
            this.setState({
                open: false
            })
        }
    }
    RemoveFilter = async () => {
        let list = await []
        await this.setState({ selected: [] })
        await this.state.header.filter(head => {
            if (!head.notDefault) {
                list.push(head.name)
            }
        })
        await this.setState({ selected: list, search: '' })
        await Object.keys(this.state).map(value => {
            if (value.includes('_header_')) {
                this.setState({ [value]: false })
            }
            return true
        })
        await this.state.header.forEach(head => {
            if (!head.notDefault) {
                this.setState({
                    [`_header_${head.name}`]: true,
                    selected: [...this.state.selected, head.name]
                })
            }
        })
        if (this.Reset !== null && this.FilterReset !== null) {
            await this.FilterReset()
            await this.Reset()
        }
    }
    HasNotRol = () => {
        this.setState({ select: 0, accessTab: false, _404: true })
    }
    getRole = (response, status) => {
        setTimeout(() => {
            this.loadCheck()
        }, 100)
        const propsState = this.props.location.state || {}
        const permision = (role, name) => this.Permision.handlePermision(role, name)
        if (status === 'response') {
            if (response.status === 200) {
                this.setState({ role: response.data.role })
                if (this.props.location && propsState) {
                    if (propsState.select === 1) {
                        if (permision(response.data.role, 'dcc')) {
                            this.setState({ select: 1, accessTab: true })
                        } else {
                            this.HasNotRol()
                        }
                    }
                } else {
                    if (permision(response.data.role, 'dcc')) {
                        this.setState({ select: 1, accessTab: true })
                    } else if (permision(response.data.role, 'p&id')) {
                        this.setState({ select: 2, accessTab: true })
                    } else {
                        this.HasNotRol()
                    }
                }
            }
        } else {
            this.setState({ select: 0, accessTab: false })
            if (response.response) {
                Notification.notify(Message.text(response.response.status), 'error')
            }
        }
    }
    ChangeTab = async num => {
        this.setState({ select: num, search: '' })
        this.loadCheck()
    }
    handleShow = () => {
        const { token, select } = this.state
        if (token) {
            switch (select) {
                case 1:
                    return <DocumentControlCenter {...this} selected={this.state.selected} />
                default:
                    return ''
            }
        }
    }
    handleShowTab = () => {
        let list = [
            {
                name: 'مدیریت مهندسی',
                value: 1,
                access: this.Permision.handlePermision(this.state.role, 'dcc')
            },

        ]
        return list
    }
    handleNameRole = () => {
        const role = this.state.role
        if (role['dcc'] || role === 'all') {
            return 'dcc'
        } else return ''
    }
    handleThis = (name, value) => {
        this[name] = value
    }
    render() {
        const { token, _404, _close, role, upload, accessTab, select, open } = this.state
        if (!token) {
            return <Redirect to='/Login' />
        } else if (_404) {
            return <Redirect to='/404' />
        } else
            return (
                <div className='main'>
                    <div className='col-12 p-0'>
                        <div className='row m-0'>
                            <Sidebar handleState={(name, value) => this.setState({ [name]: value })} />
                            <div className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                                <Menu
                                    nameRole={role ? this.handleNameRole() : 'Home'}
                                    getRole={this.getRole}
                                    nameUrl={this.props.nameUrl}
                                />
                                <div className='w-100 row m-0 main-box-dashboard'>
                                    <div className='boxes-dashboard m-0 pr-0 pl-0'>
                                        <div className='col-12 header-index pr-0 pl-0'>
                                            <div className='row m-0'>
                                                <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                                                    <div className='icon-header'>
                                                        <div className='icon'>
                                                            <span
                                                                className='item'
                                                                onClick={this.RemoveFilter}
                                                            >
                                                                <RefreshIcon />
                                                                <span>حذف فیلترها</span>
                                                            </span>
                                                        </div>
                                                        <div
                                                            className='icon position-relative justify-content-center'
                                                            ref='container'
                                                        >
                                                            <span
                                                                className='item'
                                                                onClick={this.handleButtonClick}
                                                            >
                                                                <SettingsIcon />
                                                                <span>سفارشی سازی</span>
                                                            </span>
                                                            {open && (
                                                                <Customization
                                                                    {...this}
                                                                    handleSelect={this.handleSelect}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <SearchTable
                                                    {...this}
                                                    handleState={(name, value) =>
                                                        this.setState({ [name]: value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='tab-form rtl'>
                                            <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start rtl'>
                                                {accessTab &&
                                                    this.handleShowTab().map(
                                                        (tab, index) =>
                                                            tab.access && (
                                                                <div
                                                                    className={`col-xl-3 col-lg-3 col mr-0 pr-3 pl-0`}
                                                                    onClick={() => this.ChangeTab(tab.value)}
                                                                    key={index}
                                                                >
                                                                    <div
                                                                        className={`item-tab rtl mr-0 w-100 p-0 col-12 ${select === tab.value
                                                                            ? 'active IranSans_Bold'
                                                                            : ''
                                                                            }`}
                                                                    >
                                                                        <span>
                                                                            <label
                                                                                className={`${select === tab.value
                                                                                    ? 'IranSans_Bold'
                                                                                    : ''
                                                                                    }`}
                                                                            >
                                                                                <CounterTab
                                                                                    key={index}
                                                                                    tafazol={
                                                                                        this.handleShowTab().filter(
                                                                                            item => !item.access
                                                                                        ).length
                                                                                    }
                                                                                    data={tab}
                                                                                />
                                                                                .
                                                                            </label>
                                                                            {tab.name}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )}
                                            </div>
                                        </div>
                                        <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                                            {this.handleShow()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}
