import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import HeaderTable from '../../table/HeaderTable'
import FooterTable from '../../table/FooterTable'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import BodyTable from '../../table/BodyTable'
import Permision from '../../permision/permision'
import FnsTables from '../API/FnsTables'
export default class DocumentControlCenter extends Component {
    constructor(props) {
        super(props)
        this.Permision = new Permision()
        this.API = new FnsTables(this)
        this.Elm = {}
        this.state = {
            token: Cookies.get('token'),
            header: [
                { name: 'Row', value: 'id' },
                { name: 'Project Code', value: 'project_code' },
                { name: 'Doc Code', value: 'doc_code1' },
                { name: 'Doc Code Contractor', value: 'doc_code_contractor' },
                { name: 'Doc Description', value: 'doc_description' },
                { name: 'Disc Desc', value: 'discipline' },
                { name: 'Doc Type', value: 'doc_type' },
                { name: 'Rev', value: 'revision' },
                { name: 'Trans Code', value: 'transmittal_code' },
                { name: 'Trans Received Date', value: 'transmittal_received_date' },
                { name: 'POI', value: 'poi' },
                { name: 'POI Status', value: 'poi_status' },
                { name: 'CommentSheet Code', value: 'comment_sheet_code' },
                { name: 'CommentSheet Date', value: 'comment_sheet_date' },
                { name: 'Status', value: 'status' },
                { name: 'Reply Sheet', value: 'reply_sheet_code' },
                { name: 'Reply Sheet Date', value: 'reply_sheet_date' },
                { name: 'Other', value: 'other' },
                { name: 'Remark', value: 'remark' },

            ],
            row: [],
            contentPerPage: 25,
            page: 1,
            totalLength: 0,
            pageNumber: 1,
            search: '',
            loading: 'table',
            letterNumber: '',
            idLetter: '',
            columns: {},
            open_header: '',
            list: [],
            textUrl: 'searchByFields',
            testObject: {},
            secondText: [],
            textSearch: '',
            pageAdvance: 1,
            totalAdvance: 0,
            secondData: {},
            baseUrlAPI: 'EnMg',
            selectNumber: '',
            firstData: [],
        }
    }
    componentDidMount() {
        this.props.handleThis('Reset', this.Reset)
        this.props.handleThis('FilterReset', this.RemoveFilter)
        this.props.handleThis('Search', this.handleSearch)
        this.props.handleState({ header: this.state.header })
        this.fetchData()
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    handleSearch = async text => {
        const { fetchDataAPI } = this.API
        const { token, page, contentPerPage, textSearch, baseUrlAPI } = this.state
        if (token) {
            this.setState({ search: text, loading: 'table' })
            if (text === '') {
                await this.setState({ page: 1 })
            }
            let url = `${StaticData.domainIp
                }/${baseUrlAPI}/getList/${page}?contentPerPage=${contentPerPage}${handleCheckText(text) ? `&searchInAll=${text}` : ''
                }${handleCheckText(textSearch) ? `&searchByFields=${textSearch}` : ''}`
            fetchDataAPI(url)
        }
    }
    fetchData = async (text = null) => {
        const { fetchDataAPI } = this.API
        const { token, page, contentPerPage, search, baseUrlAPI } = this.state
        if (token) {
            let url = `${StaticData.domainIp}/${baseUrlAPI}/getList/${page ||
                0}?contentPerPage=${contentPerPage}${handleCheckText(search) ? `&searchInAll=${search}` : ''
                }${handleCheckText(text) ? `&${text}` : ''}`
            fetchDataAPI(url)
        }
    }
    changeRowNumber = e => {
        const { changeRowNumberAPI } = this.API
        changeRowNumberAPI(e)
    }
    handleClick = async status => {
        const { handleClickAPI } = this.API
        handleClickAPI(status)
    }
    handleNumberPage = () => {
        let allData = []
        for (let i = 0; i < this.state.pageNumber; i++) {
            allData.push(<option value={i + 1}>{i + 1}</option>)
        }
        return allData
    }
    handleFilter = name => {
        const { handleFilterAPI } = this.API
        let result = handleFilterAPI(name)
        return result || ''
    }
    RemoveFilter = () => {
        const { RemoveFilterAPI } = this.API
        RemoveFilterAPI()
    }
    handleClickOutside = event => {
        const { handleClickOutsideAPI } = this.API
        handleClickOutsideAPI(event)
    }
    Reset = () => {
        const { ResetAPI } = this.API
        ResetAPI()
    }
    _handleClick = async (key, data, checkAdd) => {
        const nameDataBase = await data.value
        const { _handleClickAPI } = this.API
        const {
            open_header,
            token,
            list,
            pageAdvance,
            textSearch,
            search,
            baseUrlAPI
        } = await this.state
        if (token) {
            await this.setState({
                loading: 'advance',
                list: !checkAdd ? [] : list,
                open_header: !checkAdd ? key : open_header
            })
            let secondUrl = `searchByFields=${textSearch}`
            let url = `${StaticData.domainIp
                }/${baseUrlAPI}/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${handleCheckText(textSearch) ? secondUrl : ''
                }`
            _handleClickAPI(checkAdd, url)
        }
    }
    handleSearchAdvance = async text => {
        const {
            pageAdvance,
            search,
            token,
            textSearch,
            header,
            open_header,
            baseUrlAPI
        } = this.state
        const checkheader = header[open_header]
        if (checkheader) {
            const nameDataBase = checkheader.value
            if (token) {
                this.setState({ loading: 'advance' })
                let secondUrl = `searchByFields=${textSearch}`
                let url = `${StaticData.domainIp
                    }/${baseUrlAPI}/getAutoFill/${nameDataBase}/page/${pageAdvance}
        ?searchInField=${handleString(text)}
        &searchInAll=${search}&${handleCheckText(textSearch) ? secondUrl : ''}`
                const { handleSearchAdvanceAPI } = this.API
                handleSearchAdvanceAPI(url)
            }
        }
    }
    handleActions = data => {
        const { handleActionsAPI } = this.API
        handleActionsAPI(data)
    }
    GetMore = async (key, documentNumber) => {
        let { baseUrlAPI } = this.state
        let url = `${StaticData.domainIp}/${baseUrlAPI}/getDocumentRevisions?documentNumber`
        const { GetMoreAPI } = this.API
        GetMoreAPI(key, documentNumber, url)
    }
    GetSecondData = async (data, index, key) => {
        let { baseUrlAPI } = await this.state
        let url = await `${StaticData.domainIp}/${baseUrlAPI}/getDocumentRevisionDetail`
        const { GetSecondDataAPI } = await this.API
        await GetSecondDataAPI(data, index, key, url)
    }
    handlePositionBox = key => {
        const half = this.state.contentPerPage / 2
        if (key >= half) {
            return 'bottomBox'
        } else return ''
    }
    handlePositionSecondBox = (key, index) => {
        const halfKey = this.state.contentPerPage / 2,
            halfIndex = parseInt(index / 2)
        if (key >= halfKey) {
            return 'bottomBox'
        } else if (key >= halfIndex) {
            return 'middleBox'
        } else return ''
    }
    handleState = (name, value) => {
        if (name && value) {
            this.setState({ [name]: value })
        } else {
            this.setState(name)
        }
    }
    handleRefs = (name, elm) => {
        this.Elm[name] = elm
    }
    render() {
        let { baseUrlAPI } = this.state
        return (
            <React.Fragment>
                <div className='table w-100'>
                    <table>
                        <HeaderTable {...this} />
                        <BodyTable {...this} />
                    </table>
                </div>
                <FooterTable
                    {...this}
                    xls={`${baseUrlAPI}/exportExcel`}
                    xlsName='basic_engineering_export'
                    pdf={`${baseUrlAPI}/exportPdf`}
                    pdfName='basic_engineering_export'
                />
            </React.Fragment>
        )
    }
}
