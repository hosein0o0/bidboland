import React, { Component } from 'react';
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
// import SearchIcon from '@material-ui/icons/Search';
// import EditIcon from '@material-ui/icons/Edit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
// import Permision from '../permision/permision'

import Notification from '../notification/notification'
import Message from '../notification/Message'
import NotFoundTable from '../table/notFound'
import Loading from '../layout/loading'
import UploadInformation from '../Customization/UploadInformation'
import SearchTable from '../table/SearchTable'
export default class Index_AVL extends Component {
    constructor(props) {
        super(props);
        this.Search = null
        this.Fetch = null
        this.state = {
            token: Cookies.get('token'),
            select: 1,
            search: '',
            nameTab: 'foreignIndex'
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - transmittal`
    }
    // handleSearch = (e) => {
    //     this.setState({ search: e.target.value.trim() })
    //     if (this.Search !== null) {
    //         this.Search(e.target.value.trim(), this.state.nameTab)
    //     }
    // }
    changeTab = (num, nameTab) => {
        this.setState({ select: num, search: '', nameTab: nameTab })
        if (this.Fetch !== null) {
            this.Fetch(nameTab)
        }
    }
    render() {
        if (this.state.token === undefined) {
            return <Redirect to='/Login' />
        }
        else return (
            <div className='main'>
                <div className='col-12 p-0'>
                    <div className='row m-0'>
                        <Sidebar handleState={(name, value) => this.setState({ [name]: value })} />
                        <div className={`${this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                            <Menu nameRole='avl_show' nameUrl={this.props.nameUrl} />
                            <div className='w-100 row m-0 main-box-dashboard'>

                                <div className='boxes-dashboard m-0 pr-0 pl-0'>
                                    <div className='col-12 header-index pr-0 pl-0'>
                                        <div className='row m-0'>
                                            <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                                                <div className='icon-header'>
                                                    <div className='icon'>
                                                        <Link to='/create-avl'>
                                                            <AddCircleIcon />
                                                            <span>
                                                                ایجاد کاربرگ
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className='icon'>
                                                        <span className='item'
                                                            onClick={() => this.setState({ upload: !this.state.upload })}
                                                        >
                                                            <SystemUpdateAltIcon />
                                                            <span>
                                                                بروز رسانی
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {this.state.upload &&
                                                        <UploadInformation
                                                            {...this}
                                                            handleState={(name, value) => this.setState({ [name]: value })} />
                                                    }
                                                    <div className='icon'>
                                                        <Link to='#'>
                                                            <RefreshIcon />
                                                            <span>
                                                                حذف فیترها
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <SearchTable
                                                {...this}
                                                handleState={(name, value) => this.setState({ [name]: value })}
                                                hasName={true}
                                            />
                                        </div>
                                    </div>
                                    <div className='tab-form'>
                                        <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                                            <div className={`item-tab col-xl-3 ${this.state.select === 1 ? 'active IranSans_Bold' : ''}`}
                                                onClick={() => this.changeTab(1, 'foreignIndex')}
                                            >
                                                <span>
                                                    <label className={`${this.state.select === 1 ? 'IranSans_Bold' : ''}`}>1.</label>
                                                    Foregin Manufacturers
                                                </span>
                                            </div>
                                            <div className={`item-tab col-xl-3 ${this.state.select === 2 ? 'active IranSans_Bold' : ''}`}
                                                onClick={() => this.changeTab(2, 'internalIndex')}
                                            >
                                                <span>
                                                    <label className={`${this.state.select === 2 ? 'IranSans_Bold' : ''}`}>2.</label>
                                                    internal Manufacturers
                                                </span>
                                            </div>
                                            <div className={`item-tab col-xl-3 ${this.state.select === 3 ? 'active IranSans_Bold' : ''}`}
                                            >
                                                <span>
                                                    <label className={`${this.state.select === 3 ? 'IranSans_Bold' : ''}`}>3.</label>
                                                    Suppliers
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                                        <Table GetFunction={(e) => this.Search = e} GetFetch={(e) => this.Fetch = e} page={this.state.select} />
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
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: Cookies.get('token'),
            header: [
                // {name : "ردیف"},
                { name: "شناسه" },
                { name: "نام سازنده" },
                { name: "نام مدیر عامل" },
                { name: "دیسیپلین" },
                { name: "تخصیص سازنده" },
                // {name : "منبع"},
                { name: "ایران کد" },
                { name: "شناسه ملی" },
                { name: "تابعیت" },
                { name: "شروع AVL" },
                { name: "ورود به سامانه" },
                { name: "پست الکترونیک" },
                { name: "وب سایت" },
                { name: "تلفن" },
                { name: "فکس" },
                { name: "استان" },
                // {name : "شهر"},
                // {name : "سازمان های وابسته"},
                // {name : "نمایندگی"},
                { name: "آدرس" },
                { name: "شرح محصول" },
                { name: "همکاری قبلی" },
                { name: "پروژه های قبلی" },
                { name: "نام تجهیزات تامین شده قبلی" },
                { name: "عملیات" },
            ],
            row: [],
            page: 1,
            totalLength: 0,
            pageNumber: 1,
            selectNumber: '',
            secondSelectNumber: '',
            documentSelected: '',
            firstData: [],
            secondData: {},
            search: '',
            permision: '',
            filter: '',
            loading: 'table'
        }
    }
    componentDidMount() {
        this.props.GetFunction(this.handleSearch)
        this.props.GetFetch(this.fetchData)
        this.fetchData('foreignIndex')
        window.addEventListener('click', (e) => {
            if (this.state.selectNumber !== '') {
                if (e.target !== this.refs[`more_${this.state.selectNumber}`] || e.target !== this.refs[`moresvg_${this.state.selectNumber}`]) {
                    if (e.target === this.refs[`boxMore_${this.state.selectNumber}`] ||
                        e.target === this.refs[`titleMore_${this.state.selectNumber}`] ||
                        e.target === this.refs[`textMore_${this.state.selectNumber}`] ||
                        e.target === this.refs[`mainitemMore_${this.state.selectNumber}`] ||
                        e.target === this.refs[`itemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`] ||
                        e.target === this.refs[`svgItemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`] ||
                        e.target === this.refs[`spanItemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`]) {
                        this.setState({ selectNumber: '' })
                    }
                    else {
                        if (this.state.secondSelectNumber !== '') {
                            this.setState({ secondSelectNumber: '' })
                        } else {
                            this.setState({ selectNumber: '' })
                        }
                    }
                }
            }
        })
    }
    handleSearch = async (text, name) => {
        if (this.state.token) {
            await this.setState({ search: text, loading: 'table' })
            await axios.get(`${StaticData.domainIp}/avl/${name}/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(async (response) => {
                    this.setState({ loading: '' })
                    if (response.status === 200) {
                        await this.setState({
                            totalLength: response.data.content.length,
                            row: response.data.content.rows,
                            pageNumber: response.data.content.pageNumber,
                        })
                    } else {
                        Notification.notify(Message.text(response.status), 'error');
                    }
                })
                .catch(async (err) => {
                    this.setState({ loading: '' })
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error');
                    }
                })
        }
    }
    fetchData = async (name) => {
        if (this.state.token) {
            this.setState({ page: 1, contentPerPage: 25, row: [], loading: 'table' })
            await axios.get(`${StaticData.domainIp}/avl/${name}/${this.state.page}?contentPerPage=${this.state.contentPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(async (response) => {
                    this.setState({ loading: '' })
                    if (response.status === 200) {
                        await this.setState({
                            totalLength: response.data.content.length,
                            row: response.data.content.rows,
                            pageNumber: response.data.content.pageNumber,
                        })
                    } else {
                        Notification.notify(Message.text(response.status), 'error');
                    }
                })
                .catch((err) => {
                    this.setState({ loading: '' })
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error');
                    }
                })
        }
    }
    changeRowNumber = async (e) => {
        await this.setState({
            [e.target.name]: parseInt(e.target.value),
            loading: 'table'
        })

        if (e.target.name === 'contentPerPage') {
            await this.setState({ page: 1 })
            if (this.refs.page) {
                this.refs.page.value = await 1
            }
            if (this.refs.contentPerPage) {
                this.refs.contentPerPage.value = await parseInt(e.target.value)
            }
        } else if (e.target.name === 'page') {
            if (this.refs.contentPerPage) {
                this.refs.contentPerPage.value = await this.state.contentPerPage
            }
            if (this.refs.page) {
                this.refs.page.value = await parseInt(e.target.value)
            }
        }
        if (this.state.search !== '') {
            await this.handleSearch(this.state.search)
        } else if (this.state.textSearch !== '') {
            await this.fetchData(`searchByFields=${this.state.textSearch}`)
        }
        else {
            await this.fetchData()
        }
    }
    handleClick = async (status) => {
        switch (status) {
            case 'right':
                if (this.state.page > 1 && this.state.page <= this.state.pageNumber) {
                    await this.setState({ page: parseInt(this.state.page) - 1, loading: 'table' })
                    if (this.state.search !== '') {
                        await this.handleSearch(this.state.search)
                    } else if (this.state.textSearch !== '') {
                        await this.fetchData(`searchByFields=${this.state.textSearch}`)
                    }
                    else {
                        await this.fetchData()
                    }
                    if (this.refs.page) {
                        this.refs.page.value = await parseInt(this.state.page)
                    }
                    if (this.refs.contentPerPage) {
                        this.refs.contentPerPage.value = await this.state.contentPerPage
                    }
                }
                break;
            case 'left':
                if (this.state.page < this.state.pageNumber) {
                    await this.setState({ page: parseInt(this.state.page) + 1, loading: 'table' })
                    if (this.state.search !== '') {
                        await this.handleSearch(this.state.search)
                    } else if (this.state.textSearch !== '') {
                        await this.fetchData(`searchByFields=${this.state.textSearch}`)
                    }
                    else {
                        await this.fetchData()
                    }
                    if (this.refs.page) {
                        this.refs.page.value = await parseInt(this.state.page)
                    }
                    if (this.refs.contentPerPage) {
                        this.refs.contentPerPage.value = await this.state.contentPerPage
                    }
                }
                break;
            default:
                return true
        }
    }
    handleNumberPage = () => {
        let allData = []
        for (let i = 0; i < this.state.pageNumber; i++) {
            allData.push(
                <option value={i + 1}>{i + 1}</option>
            )
        }
        return allData
    }
    GetMore = async (key, documentNumber) => {
        await this.setState({ selectNumber: key, firstData: [], documentSelected: '' })
        if (this.state.token) {
            await axios.get(`${StaticData.domainIp}/mdl/getDocumentRevisions?documentNumber=${documentNumber}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        this.setState({ firstData: response.data.content, selectNumber: key, documentSelected: documentNumber })
                    } else {
                        Notification.notify(Message.text(response.status), 'error');
                    }
                })
                .catch(async (err) => {
                    await this.setState({ selectNumber: key })
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error');
                    }
                })
        }
    }
    GetSecondData = async (data, index, key) => {
        if (this.state.token) {
            this.setState({ selectNumber: key, secondData: {}, secondSelectNumber: '' })
            await axios.get(`${StaticData.domainIp}/mdl/getDocumentRevisionDetail?documentId=${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        await this.setState({ secondData: response.data.content, selectNumber: key, secondSelectNumber: index })
                    } else {
                        Notification.notify(Message.text(response.status), 'error');
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error');
                    }
                })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='table persian rtl w-100'>
                    <table>
                        <tbody>
                            <tr className='header'>
                                {this.state.header.map((data, key) =>
                                    <th key={key} className={(this.state.header.length - 1) === key ? 'action' : ''}>
                                        {data.name}
                                    </th>
                                )}
                            </tr>
                            {this.state.loading === 'table' ?
                                <tr className='loading'>
                                    <div className='main-loading'>
                                        <div className='w-100 row m-0 justify-content-center'>
                                            <Loading className='table row m-0 justify-content-center' />
                                            <span className='w-100 mt-2'>در حال بارگذاری</span>
                                        </div>
                                    </div>
                                </tr>
                                :
                                this.state.row.length === 0 ?
                                    <NotFoundTable />
                                    :
                                    this.state.row.map((data, index) =>
                                        <tr key={index} ref={`tr_${data.id}`}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.managerName}</td>
                                            <td>{data.disc}</td>
                                            <td>{data.constructor}</td>
                                            {/* <td>{data.resource}</td> */}
                                            <td>{data.iranCode}</td>
                                            <td>{data.melliCode}</td>
                                            <td>{data.citizenShip === 'internal' ? 'داخلی' : 'خارجی'}</td>
                                            <td>{data.avlStartDate}</td>
                                            <td>{data.systemEntryDate}</td>
                                            <td>{data.email}</td>
                                            <td>{data.website}</td>
                                            <td>{data.tell}</td>
                                            <td>{data.fax}</td>
                                            <td>{data.city}</td>
                                            <td>{!data.address || data.address === '' ? 'ندارد' : data.address}</td>
                                            <td>{data.resource}</td>
                                            <td>{data.previousCollaboration === '1' ? 'دارد' : 'ندارد'}</td>
                                            <td>{data.previousProjectName === '' ? 'ندارد' : data.previousProjectName}</td>
                                            <td>{data.previousEquipmentName === '' ? 'ندارد' : data.previousEquipmentName}</td>
                                            <td className='action justify-content-center'>
                                                {/* <Link className='mr-auto ml-auto' to={`correspondence-${data.id}`} target='_blank' rel='noreferrer'> */}
                                                <span className='edit'><MoreVertRoundedIcon /></span>
                                                {/* </Link> */}
                                            </td>
                                        </tr>
                                    )}
                        </tbody>
                    </table>
                </div>
                {(this.state.row.length === 0 && this.state.search === '') ?
                    ''
                    :
                    <div className={`footer-table row mr-0 ml-0 w-100 ${this.state.loading === 'table' ? 'd-none' : ''}`}>
                        <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
                            {/* <div className='link-footer'>
                                <a href={`${StaticData.domainIp}/mdl/exportExcel`} target='_blank' rel='noreferrer' className='xls'>
                                    <img src='/img/XLS.svg' alt='xls' />
                                    خروجی اکسل
                                </a>
                                <a href={`${StaticData.domainIp}/mdl/exportPdf`} target='_blank' rel='noreferrer' className='pdf'>
                                    <img src='/img/PDF.svg' alt='PDF' />
                                    خروجی pdf
                                </a>
                            </div> */}
                        </div>
                        <div className='col-xl-7 col-lg-7 col-md-12 col-12 align-items-center row m-0 justify-content-end'>
                            <div className='main-item-footer'>
                                <div className='item num-row'>
                                    <label >
                                        تعداد ردیف در هر صفحه :
                                    </label>
                                    <select name='contentPerPage' ref='contentPerPage' onChange={(e) => this.changeRowNumber(e)}>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                                <div className='item'>
                                    <label>
                                        آیتم
                                        {this.state.totalLength <
                                            (this.state.contentPerPage * this.state.page) ?
                                            this.state.totalLength :
                                            (this.state.contentPerPage * this.state.page)
                                        }
                                        از
                                        {this.state.length}
                                        {this.state.totalLength}
                                        - صفحه
                                    </label>
                                    <select ref='page' name='page' onChange={(e) => this.changeRowNumber(e)}>
                                        {this.handleNumberPage()}
                                    </select>
                                    <label>
                                        از {this.state.pageNumber}
                                    </label>
                                </div>
                                <div className='item arrow'>
                                    <button
                                        onClick={() => this.handleClick('right')}
                                    ><ChevronRightIcon /></button>
                                    <button
                                        onClick={() => this.handleClick('left')}
                                    ><ChevronLeftIcon /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}