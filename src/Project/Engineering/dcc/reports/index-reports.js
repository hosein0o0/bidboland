import React, { Component } from 'react'
import Sidebar from '../../../../layout/sidebar'
import Menu from '../../../../layout/menu'
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom'
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import StaticData from '../../../../staticData'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import NotFoundTable from '../../../../table/notFound'
import Loading from '../../../../layout/loading'
import RowItems from './RowItems'
import Total from './Total'
import SecondTotal from './SecondTotal'
export default class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: Cookies.get('token'),
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - گزارشات`
    }
    render() {
        if (this.state.token === undefined) {
            return <Redirect to='/Login' />
        } else {
            return (
                <div className='main'>
                    <div className='col-12 p-0'>
                        <div className='row m-0'>
                            <Sidebar handleState={(name, value) => this.setState({ [name]: value })} />
                            <div className={`${this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                                <Menu nameUrl={this.props.nameUrl}/>
                                <div className='w-100 row m-0 main-box-dashboard'>
                                    <div className='boxes-dashboard m-0 pr-0 pl-0'>
                                        <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                                            <Table token={this.state.token} getFunction={(e) => this.Search = e} url='tq' />
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
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: {
                firstHeader: [
                    { name: 'Discipline', rowSpan: 2, colSpan: 1 },
                    { name: 'All Docs', rowSpan: 2, colSpan: 1 },
                    { name: 'Not Issue', rowSpan: 2, colSpan: 1 },
                    { name: 'Issued Count', rowSpan: 2, colSpan: 1 },
                    { name: 'FIS', rowSpan: 1, colSpan: 6, hasBorder: true },
                    { name: 'IFI', rowSpan: 1, colSpan: 5, hasBorder: true },
                    { name: 'IFA', rowSpan: 1, colSpan: 5, hasBorder: true },
                    { name: 'AFC', rowSpan: 1, colSpan: 2, hasBorder: true },
                ],
                SecondHeader: [
                    { name: 'FA' },
                    { name: 'AFC' },
                    // { name: 'AP' },
                    { name: 'AWC' },
                    { name: 'NO Com.' },
                    { name: ' Commented' },
                    { name: 'Not . R' },
                    { name: 'No Com.' },
                    { name: 'AWC' },
                    { name: 'Commented' },
                    { name: 'R' },
                    { name: 'Not . R' },
                    // { name: 'FA' },
                    { name: 'AP' },
                    { name: 'AWC' },
                    { name: 'Commented ' },
                    { name: 'R' },
                    { name: 'Not . R' },
                    { name: 'AFC' },
                    { name: 'Not . R' },
                ],
            },
            // listName: [
            //     'Architectural', 'Civil', 'Electrical', 'HVAC', 'Instrument', 'Machinery', 'Mechanical',
            //     'Piping', 'Project Management','Process', 'Safety', 'Structural', 'Technical Inspection', 'Telecommunication'
            // ],
            listName: [],
            loading: 'table',
            token: Cookies.get('token'),
            data: {},
            sum: {},
            Sum2: {},
            sum3: 0
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        if (this.state.token) {
            this.setState({ loading: 'table' })
            await axios.get(`${StaticData.domainIp}/mdl/engineeringReport`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(async (response) => {
                    this.setState({ loading: '' })
                    if (response.status === 200) {
                        await this.setState({
                            data: response.data.content.data,
                            listName: Object.keys(response.data.content.data)
                        })
                        await this.handleSum()
                        await this.secondSum()
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
    handleSum = () => {
        let sum = this.state.sum
        sum['sumArchitectural'] = Object.keys(this.state.data).map((_) => { return this.state.data[_].AllDocs }).reduce((a, b) => a + b, 0)
        sum['sumNotIssued'] = Object.keys(this.state.data).map((_) => { return this.state.data[_].NotIssued }).reduce((a, b) => a + b, 0)
        sum['sumIssuedCount'] = Object.keys(this.state.data).map((_) => { return this.state.data[_].IssuedCount }).reduce((a, b) => a + b, 0)

        let ObjList = {
            FIS: ['FA', 'AFC', 'AWC', 'NoComment', 'Commented', 'NoResponse'],
            IFI: ['NoComment', 'AWC', 'Commented', 'Reject', 'NoResponse'],
            IFA: ['AP', 'AWC', 'Commented', 'Reject', 'NoResponse'],
            AFC: ['AFC', 'NoResponse']
        }
        Object.keys(ObjList).map((_data) => {
            return (
                ObjList[_data].forEach((data) => {
                    sum[`sum${_data}${data}`] = Object.keys(this.state.data).map((item) => {
                        return this.state.data[item][_data][data]
                    })
                        .reduce((a, b) => a + b, 0)
                })
            )
        })
        this.setState({ sum: sum })
    }
    secondSum = () => {
        let ObjList = {
            FIS: ['FA', 'AFC', 'AWC', 'NoComment', 'Commented', 'NoResponse'],
            IFI: ['NoComment', 'AWC', 'Commented', 'Reject', 'NoResponse'],
            IFA: ['AP', 'AWC', 'Commented', 'Reject', 'NoResponse'],
            AFC: ['AFC', 'NoResponse']
        }
        let objSum = {
            FIS: [],
            IFI: [],
            IFA: [],
            AFC: []
        }
        Object.keys(ObjList).map((_data) => {
            return (
                ObjList[_data].forEach((data) => {
                    if (data) {
                        objSum[_data].push(this.state.sum[`sum${_data}${data}`])
                    }
                })
            )
        })
        objSum.FIS = objSum.FIS.reduce((a, b) => a + b, 0)
        objSum.IFI = objSum.IFI.reduce((a, b) => a + b, 0)
        objSum.IFA = objSum.IFA.reduce((a, b) => a + b, 0)
        objSum.AFC = objSum.AFC.reduce((a, b) => a + b, 0)
        this.setState({ Sum2: objSum, sum3: objSum.FIS + objSum.IFI + objSum.IFA + objSum.AFC })
    }
    render() {
        return (
            <div className='table ltr w-100'>
                <table>
                    <thead>
                        <tr className='header subfield'>
                            {this.state.header.firstHeader.map((first, key1) =>
                                <th className={`${first.hasBorder ? 'bottom' : ''} ${key1 === 0 || key1 === (this.state.header.firstHeader.length - 1) ? '' : 'hasBorder'}`} key={key1} rowSpan={first.rowSpan} colSpan={first.colSpan}>{first.name}</th>
                            )}
                        </tr>
                        <tr className='header subfield'>
                            {this.state.header.SecondHeader.map((second, key2) =>
                                <th key={key2} className={key2 === 0 || key2 === (this.state.header.SecondHeader.length - 1) ? '' : 'hasBorder'}>{second.name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
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
                            Object.keys(this.state.data).length === 0 ?
                                <NotFoundTable />
                                :
                                Object.keys(this.state.data).map((data, key) =>
                                    <tr key={key}>
                                        <RowItems data={this.state.data[data]} name={this.state.listName[key]} key={key} />
                                    </tr>
                                )}

                        {this.state.loading === '' &&
                            <React.Fragment>
                                <Total sum={this.state.sum} />
                                <SecondTotal sum={this.state.Sum2} />
                                <tr className='subfield'>
                                    <th className={`hasBorder __hasColor`} rowSpan={1} colSpan={18}>{this.state.sum3}</th>
                                </tr>
                            </React.Fragment>
                        }
                    </tbody>
                </table>
            </div >
        )
    }
}