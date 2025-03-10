import React, { Component } from 'react'
import ManageTab from './ManageTab'
import handleString from '../../handleString'
import ListProblems from './ListProblems'
// import SupervisorAssignment from './SupervisorAssignment'
import API from './API'
import Cookies from 'js-cookie'
import Dispatch from '../Dispatch/Dispatch'
import ResetState from './ResetState'
import ButtonSubmit from './ButtonSubmit'
import TOCC from '../TOCC'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import Form from '../../Form/Form'
import ButtonSubmitReviewResult from './buttonSubmitReviewResult'
// import handleCheckText from '../../handleCheckText'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
export default class TSR10 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetState = new ResetState(this)
    this.state = {
      token: Cookies.get('token'),
      tab: 1
    }
  }
  componentDidMount() {
    this.fetchData()
    this.props.handleState({
      tab_10: 1
    })
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
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleDisabled = () => {
    const { handleDisabledAPI } = this.API
    const result = handleDisabledAPI()
    return result
  }
  handleListForm = () => {
    const { handleListFormAPI } = this.API
    const result = handleListFormAPI()
    return result
  }
  render() {
    const {
      handlCreate,
      ValueTable,
      handleTextListDispatch,
      handleDisabledElmAPI,
      ShowSign,
      handleCheckUpdate,
      Split
    } = this.API
    const name = ValueTable()
    let namecheck = `${name}_allocation_allow`
    const checkShowProblem = this.state[namecheck] ? false : true
    const canCreate = handlCreate(10)
    const { tab } = this.state
    const nameDis = `checkBox_${`10${tab}`}_${name}`
    const filter2 = handleTextListDispatch()
    const state1 = !handleDisabledElmAPI()
    const ShowCreate = state1 && canCreate && checkShowProblem
    const canUpdate = handleCheckUpdate(10)
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(10) ? false : true
    const sign_3 = ShowCreate ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    const ShowUpdate = state1 && canUpdate && checkShowProblem
    const { review_result_verify_allow } = this.state
    const status = Split()
    return (
      <div className='form row justify-content-start'>
        <div className='w-100 row justify-content-start m-0'>
          {review_result_verify_allow && (
            <React.Fragment>
              <Form {...this} itemForm={this.handleListForm()} />
              <div className='col-12'>
                <ButtonSubmitReviewResult {...this} />
              </div>
            </React.Fragment>
          )}
          <ManageTab {...this} />
          <BoxText {...this} id={10} status={status}/>
          {/* <SupervisorAssignment {...this} /> */}
          <Dispatch
            {...this}
            canCreate={canCreate}
            nameDis={nameDis}
            nameTab={name}
            filter1='user_unit'
            filter2={filter2}
          />
          {checkShowProblem && <ListProblems {...this} />}
          {ShowCreate && <TOCC {...this} multiTab={tab} nameCC={name} />}
          {ShowCreate && <ButtonSubmit {...this} />}
          {ShowUpdate && <ButtonEdit {...this} />}
          {canSign && <Sign {...this} multiTab={tab} status={status} />}
          <CCDisabled {...this} nameCC={`${name}_notification_cc_info`} />
        </div>
      </div>
    )
  }
}
