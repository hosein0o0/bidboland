import React, { Component } from "react";
import API from "./API";
import Cookies from 'js-cookie'
import Form from '../../Form/Form'
import handleString from "../../handleString";
import TOCC from '../TOCC'
import ButtonSubmit from "./ButtonSubmit";
import Sign from "../sign/Sign";
import CCDisabled from "../CCDisabled";
import Dispatch from '../Dispatch/Dispatch'
import StaticList from "./StaticList";
import BoxText from "../ShowTsr/BoxText";
export default class TSR12 extends Component {
    constructor(props) {
        super(props)
        this.API = new API(this)
        this.ResetSetting = StaticList
        this.state = {
            token: Cookies.get('token'),
            effective: 'false'

        }
    }
    componentDidMount() {
        this.fetchData()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps
            this.fetchData()
        }
    }
    fetchData = () => {
        const { fetchDataAPI } = this.API
        fetchDataAPI()
    }
    handleListForm = () => {
        const { handleListFormAPI } = this.API
        const result = handleListFormAPI()
        return result
    }
    handleState = obj => {
        this.setState(obj)
    }
    OnFocus = name => {
        this.setState({ foucs: name })
    }
    OnBlur = () => {
        this.setState({ foucs: '' })
    }
    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: handleString(value) })
    }
    handleDisabled = () => {
        const { handleDisabledAPI } = this.API
        const result = handleDisabledAPI()
        return result
    }
    handleListDispatch = () => {
        const { unit_list } = this.state
        let list = unit_list || []
        let list_result = Object.keys(list).map((item) => {
            let obj = list[item] || {}
            const { label } = obj
            return handleString(label)
        })
        let result = list_result.join('_SD_')
        return result
    }
    render() {
        const { status_copy } = this.state
        const { handlCreate, ShowSign, handleCheckUpdate, handleDisabledAPIElm } = this.API
        const canCreate = handlCreate(12),
            canUpdate = handleCheckUpdate(12)
        const canCreateSubmit = !handleDisabledAPIElm() && canCreate
        const sign_1 = ShowSign() ? true : false
        const sign_2 = handleCheckUpdate(12) ? false : true
        const sign_3 = canCreateSubmit ? false : true
        const canSign = sign_1 && sign_2 && sign_3
        return (
            <div className='form row justify-content-start'>
                <div className='w-100 row justify-content-start m-0'>
                    <BoxText
                        {...this}
                        id={12}
                        status={status_copy}
                        txt='فرم توسط مدیر اداره متقاضی TSR تکمیل و یا دستگردانی (انتخاب کارشناس) می‌گردد.'
                    />
                    <Dispatch
                        {...this}
                        filter1='user_unit'
                        filter2={this.handleListDispatch()}
                        canCreate={canCreate}
                    />
                    <Form {...this} itemForm={this.handleListForm()} />
                    {canCreateSubmit && <TOCC {...this} />}
                    {canCreateSubmit && <ButtonSubmit {...this} />}
                    {canSign && <Sign {...this} status={status_copy} />}
                    {canUpdate ? <ButtonSubmit {...this} update={true} /> : ''}
                    <CCDisabled {...this} />
                </div>
            </div>
        )
    }
}