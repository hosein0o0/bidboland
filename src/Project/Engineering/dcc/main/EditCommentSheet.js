// import React, { Component } from 'react';
// import Sidebar from '../../../../layout/sidebar'
// import Menu from '../../../../layout/menu'
// import { Redirect } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Permision from '../../../../permision/permision'
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
// import DatePicker from 'react-datepicker2';
// import Select from 'react-select';
// import axios from 'axios'
// import StaticData from '../../../../staticData'
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import Loading from '../../../../layout/loading'
// import DoneIcon from '@material-ui/icons/Done';
// import Notification from '../../../../notification/notification'
// import Message from '../../../../notification/Message'
// import GetCustomFormat from '../../../../getCustomFormat'
// import moment from 'moment-jalaali'
// import RJ from './RJ'
// import AN from './AN'
// import CM from './CM'
// import AP from './AP'
// import NCM from './NCM'
// export default class Transmittal extends Component {
//     constructor(props) {
//         super(props);
//         this.Permision = new Permision()
//         this.Date = null
//         this.getCustomFormat = GetCustomFormat.getCustomFormat
//         this.text = 'BRS-CS-'
//         this.state = {
//             popUp: false,
//             foucs: '',
//             token: Cookies.get('token'),
//             cc: '',
//             commentSheetDate: '',
//             contractNumber: '',
//             documentList: [],
//             from: '',
//             to: '',
//             transmittalDate: '',
//             transmittalNumber: '',
//             CommentSheetNo: '',
//             momDate: null,
//             momNo: '',
//             documentNumberSelected: null,
//             documentDetail: {},
//             status2: 'AP',
//             letterNo: '',
//             data: {},
//             pictureShow: '',
//             redirect: false,
//             disabled: false,
//             detail: {},
//             dateDisabld: '',
//             redirectContinue: false,
//             disabledButton: false,
//             id : '',
//             checkPermision : false,
//             transmittal_id : ''
//         }
//     }
//     componentDidMount() {
//         let id = window.location.href.split('-')[window.location.href.split('-').length - 1]
//         if(id){
//             this.setState({transmittal_id : id})
//             this.fetchData(id)
//         }
//         document.title = `${StaticData.Title} -  ویرایش کامنت شیت`
//     }
//     fetchData = (id) => {
//         axios.get(`${StaticData.domainIp}/transmittal/get/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${this.state.token}`
//                 }
//             })
//             .then((response) => {
//                 if (response.status === 200) {
//                     if(this.Permision.handlePermision(response.data.role , 'transmittal_comment_sheet')){
//                         this.setState(response.data.content.commentSheet)
//                     }else {
//                         this.setState({checkPermision : true})
//                     }
//                 } else {
//                     Notification.notify(Message.text(response.status), 'error');
//                 }
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     Notification.notify(Message.text(err.response.status), 'error');
//                     if (err.response.status === 404) {
//                         this.setState({ back: true })
//                     }
//                 }
//             })
//     }
//     handleDocumentNumber = async (newValue) => {
//         await this.setState({ documentNumberSelected: newValue })
//         await axios.get(`${StaticData.domainIp}/commentSheet/getByDocumentCode?documentCode=${newValue.value}`, {
//             headers: {
//                 'Authorization': `Bearer ${this.state.token}`
//             }
//         })
//             .then((response) => {
//                 if (response.status === 200) {
//                     this.setState({
//                         documentDetail: response.data.content,
//                         disabled: response.data.content.readonly,
//                         id : response.data.content.commentsheet.id
//                     })
//                     if (response.data.content.readonly) {
//                         let data
//                         if(response.data.content.commentsheet.status === 'CM'){
//                             data = Object.keys(response.data.content.commentsheet.detail).map((_data)=>{
//                                 return response.data.content.commentsheet.detail[_data]
//                             })
//                         }else {
//                             data = response.data.content.commentsheet.detail
//                         }
//                         this.setState({
//                             CommentSheetNo: response.data.content.commentsheet.commentNo,
//                             commentSheetDate: response.data.content.commentsheet.commentSheetDate,
//                             letterNo: response.data.content.commentsheet.letterNo ? response.data.content.commentsheet.letterNo : '',
//                             momNo: response.data.content.commentsheet.momNo ? response.data.content.commentsheet.momNo : '',
//                             status2: response.data.content.commentsheet.status,
//                             detail: response.data.content.commentsheet.detail,
//                             data : data,
//                             momDate: response.data.content.commentsheet.momDate?moment(`${response.data.content.commentsheet.momDate}`, 'YYYY/M/D') : null
//                         })
//                     } else {
//                         this.setState({
//                             CommentSheetNo: '',
//                             commentSheetDate: this.Date,
//                             letterNo: '',
//                             momNo: '',
//                             status2: 'AP',
//                             detail: {}

//                     })
//                     }
//                 } else {
//                     Notification.notify(Message.text(response.status), 'error');
//                 }
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     Notification.notify(Message.text(err.response.status), 'error');
//                     if (err.response.status === 404) {
//                         setTimeout(() => {
//                             this.props.handleBack(true)
//                         }, 5000);
//                     }
//                 }
//             })
//     }
//     OnFocus = (name) => {
//         this.setState({ foucs: name })
//     }
//     OnBlur = () => {
//         this.setState({ foucs: '' })
//     }
//     handleChange = async (e) => {
//         await this.setState({ [e.target.name]: e.target.value })
//     }
//     handleShow = () => {
//         if (this.state.status2 === 'RJ') {
//             return <RJ
//                 foucs={this.state.foucs}
//                 OnFocus={this.OnFocus}
//                 OnBlur={this.OnBlur}
//                 getData={e => this.setState({ data: e })}
//                 disabled={false}
//                 detail={this.state.detail}
//                 edit={true}
//             />
//         }
//         else if (this.state.status2 === 'AN') {
//             return <AN
//                 foucs={this.state.foucs}
//                 OnFocus={this.OnFocus}
//                 OnBlur={this.OnBlur}
//                 getData={e => this.setState({ data: e })}
//                 disabled={false}
//                 detail={this.state.detail}
//                 edit={true}
//             />
//         } else if (this.state.status2 === 'CM') {
//             return <CM
//                 foucs={this.state.foucs}
//                 OnFocus={this.OnFocus}
//                 OnBlur={this.OnBlur}
//                 getData={e => this.setState({ data: e })}
//                 disabled={false}
//                 detail={this.state.detail}
//                 edit={true}
//             />
//         }else if(this.state.status2 === 'AP'){
//             return <AP
//             foucs={this.state.foucs}
//             OnFocus={this.OnFocus}
//             OnBlur={this.OnBlur}
//             getData={e => this.setState({ data: e })}
//             disabled={false}
//             detail={this.state.detail}
//             edit={true}
//         />
//         }
//         else if(this.state.status2 === 'NCM'){
//             return <NCM
//             foucs={this.state.foucs}
//             OnFocus={this.OnFocus}
//             OnBlur={this.OnBlur}
//             getData={e => this.setState({ data: e })}
//             disabled={false}
//             detail={this.state.detail}
//             edit={true}
//         />
//         }
//     }
//     handleSubmit = async (status) => {
//         let checkStatus = false , i=0
//         const check = this.state.id !== '' && this.state.documentNumberSelected !== null && this.state.from !== '' && this.state.to !== '' && this.state.cc !== '' && this.state.CommentSheetNo !== '' && this.state.status2 !== ''
//             this.setState({ disabledButton: true })
//             if (status === 'continue') {
//                 this.setState({ loading: 'submit-continue' })
//             } else {
//                 this.setState({ loading: 'submit' })
//             }
//             let result =await {}
//             if (this.state.status2 === 'CM') {
//                 let cm =await this.state.data
//                 result = await Object.assign({}, Object.keys(cm).map((data) => {
//                     cm[data].AttachmentFile = Object.assign({}, cm[data].AttachmentFile)
//                     cm[data].NativeFile = Object.assign({}, cm[data].NativeFile)
//                     return cm[data]
//                 }))
//                 while(i < this.state.data.length){
//                     checkStatus = cm[i].text !== ''
//                     if(!checkStatus){
//                         break
//                     }
//                     i++
//                 }
//             } else if (this.state.status2 === 'RJ' || this.state.status2 === 'AN' || this.state.status2 === 'AP' || this.state.status2 === 'NCM') {
//                 let result =await this.state.data
//                 result.AttachmentFile =await Object.assign({}, result.AttachmentFile)
//                 result.NativeFile =await Object.assign({}, result.NativeFile)
//                 checkStatus = result.text !== ''
//             }
//             if(checkStatus && check){
//                 setTimeout(async () => {
//                 let datareg = await new FormData()
//                 await datareg.append('id', this.state.id)
//                 await datareg.append('transmittal_id', this.state.transmittal_id)
//                 await datareg.append('documentCode', this.state.documentNumberSelected.value)
//                 await datareg.append('from', this.state.from)
//                 await datareg.append('to', this.state.to)
//                 await datareg.append('cc', this.state.cc)
//                 await datareg.append('commentNo', this.state.CommentSheetNo)
//                 await datareg.append('letterNo', this.state.letterNo)
//                 await datareg.append('momDate', this.getCustomFormat(this.state.momDate, false))
//                 await datareg.append('momNo', this.state.momNo)
//                 await datareg.append('status', this.state.status2)
//                 await datareg.append('detail', JSON.stringify(result))
//                 await axios({
//                         method: 'post',
//                         url: `${StaticData.domainIp}/commentSheet/update`,
//                         data: datareg,
//                         headers: {
//                                 'Authorization': this.state.token ? `Bearer ${this.state.token}` : null
//                             },
//                         })
//                         .then(async (response) => {
//                             this.setState({ loading: '' })
//                             if (response.status === 200) {
//                                 Notification.notify(Message.text(900), 'success');
//                                 setTimeout(async() => {
//                                     await this.setState({ disabledButton: false })
//                                     if (status === 'continue') {
//                                         // await window.location.reload(true)
//                                     } else {
//                                         // await this.setState({ redirect: true })
//                                     }
//                                 }, 5000);
//                             } else {
//                                 Notification.notify(Message.text(response.status), 'error');
//                                 this.setState({ disabledButton: false })
//                             }
//                             })
//                         .catch((err) => {
//                             this.setState({ loading: '' , disabledButton: false})
//                             if (err.response) {
//                                 Notification.notify(Message.text(err.response.status), 'error');
//                             }
//                         })
//             }, 100);
//         }
//         else {
//             Notification.notify(Message.text(99), 'error');
//         }
//     }
//     render() {
//         if (this.state.token === undefined) {
//             return <Redirect to = '/Login' />
//         }else if(this.state.checkPermision){
//             return <Redirect to = {
//                 {
//                     pathname: `/dcc`,
//                     state: { select: 2 }
//                 }
//             }
//             />
//         }
//         else {
//             if (this.state.redirect) {
//                 return ( 
//                     <Redirect to = {
//                         {
//                             pathname: `/dcc`,
//                             state: { select: 2 }
//                         }
//                     }
//                     />
//                 )
//             } else {
//                 if (this.state.back) {
//                     return <Redirect to = '/404' />
//                 } else return ( 
//                     <div className = 'main' >
//                         <div className = 'col-12 p-0' >
//                         <div className = 'row m-0' >
//     <Sidebar handleState={(name , value)=> this.setState({[name] : value})}/>
//                             <div className={`${this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
//                                 <Menu nameRole='Home'/>
//                                 <div className = 'w-100 row m-0 main-box-dashboard' >
//                                     <div className = 'boxes-dashboard row m-0 p-0' >
//                                         <div className = 'main-form' >
//                                             <div className = 'title-from' >
//                                                 <h2> انتقال سند - ویرایش کامنت شیت </h2>
//                                             </div>
//                                             <div className = 'col-xl-8 col-lg-10 col-md-12 col-12' >
//                                             <div className='form row justify-content-start ltr'>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form data ${this.state.transmittalDate !== '' ? 'active' : ''}`}>
//                                                         <div className='icon-field'>
//                                                             <DateRangeRoundedIcon />
//                                                         </div>
//                                                         <div className='col p-0'>
//                                                             <label>Transmittal Date
//                                                         <span className='star IranSans_Bold'>*</span>
//                                                             </label>
//                                                             <input className='text-left ltr' readOnly={true} name='transmittalDate' value={this.state.transmittalDate} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.transmittalNumber !== '' ? 'active' : ''}`}>
//                                                         <label>Transmittal No
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='transmittalNumber' value={this.state.transmittalNumber} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.from !== '' ? 'active' : ''}`}>
//                                                         <label>From
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='from' value={this.state.from} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.contractNumber !== '' ? 'active' : ''}`}>
//                                                         <label>Contarct No.
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='contractNumber' value={this.state.contractNumber} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.cc !== '' ? 'active' : ''}`}>
//                                                         <label>CC
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='cc' value={this.state.cc} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.to !== '' ? 'active' : ''}`}>
//                                                         <label>TO
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='to' value={this.state.to} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form data ${this.state.CommnetSheetDate !== '' ? 'active' : ''}`}>
//                                                         <div className='icon-field'>
//                                                             <DateRangeRoundedIcon />
//                                                         </div>
//                                                         <div className='col p-0'>
//                                                             <label>Comment Sheet Date.
//                                                         <span className='star IranSans_Bold'>*</span>
//                                                             </label>
//                                                             <input className='text-left ltr' readOnly={true} name='commentSheetDate' value={this.state.commentSheetDate} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className='field-form selectBox ltr'>
//                                                         <Select
//                                                             onChange={(newValue) => this.handleDocumentNumber(newValue)}
//                                                             name="documentNumberSelected"
//                                                             options={this.state.documentList}
//                                                             value={this.state.documentNumberSelected}
//                                                             className="basic-multi-select"
//                                                             classNamePrefix="select"
//                                                             placeholder={
//                                                                 <label>Document No
//                                                                 <span className='star IranSans_Bold'>*</span>
//                                                                 </label>
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.foucs === 'momDate' || (this.state.momDate !== null || this.state.dateDisabld !== '') ? 'active' : ''}`}>
//                                                         <div className='icon-field'>
//                                                             <DateRangeRoundedIcon />
//                                                         </div>
//                                                         <div className='col p-0'>
//                                                             <label>mom Date</label>
//                                                             <DatePicker
//                                                                 className='text-left ltr'
//                                                                 value={this.state.momDate}
//                                                                 persianDigits={true}
//                                                                 isGregorian={true}
//                                                                 timePicker={false}
//                                                                 onChange={momDate => this.setState({ momDate })}
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.foucs === 'momNo' || this.state.momNo !== '' ? 'active' : ''}`}>
//                                                         <label>mom No. (For Open Status)</label>
//                                                         <input
//                                                             className='text-left ltr'
//                                                             onFocus={(e) => this.OnFocus(e.target.name)}
//                                                             onBlur={this.OnBlur}
//                                                             onChange={this.handleChange}
//                                                             name='momNo'
//                                                             value={this.state.momNo}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.foucs === 'CommentSheetNo' || this.state.CommentSheetNo !== '' ? 'active' : ''}`}>
//                                                         <label>CommentSheet No.
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <input
//                                                             className='text-left ltr'
//                                                             name='CommentSheetNo'
//                                                             value={this.state.CommentSheetNo}
//                                                             onFocus={(e) => this.OnFocus(e.target.name)}
//                                                             onBlur={this.OnBlur}
//                                                             readOnly={this.state.disabled}
//                                                             onChange={this.handleChange}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.documentTitle ? 'active' : ''}`}>
//                                                         <label>Document Title
//                                                 </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='documentTitle' value={this.state.documentDetail.documentTitle ? this.state.documentDetail.documentTitle : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.revision ? 'active' : ''}`}>
//                                                         <label>Rev
//                                                 </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='revision' value={this.state.documentDetail.revision ? this.state.documentDetail.revision : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.status ? 'active' : ''}`}>
//                                                         <label>P.O.I</label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='status' value={this.state.documentDetail.status ? this.state.documentDetail.status : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.replySheetNumber ? 'active' : ''}`}>
//                                                         <label>Reply Sheet No
//                                                 </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='replySheetNumber' value={this.state.documentDetail.replySheetNumber ? this.state.documentDetail.replySheetNumber : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.replySheetDate ? 'active' : ''}`}>
//                                                         <div className='icon-field'>
//                                                             <DateRangeRoundedIcon />
//                                                         </div>
//                                                         <div className='col p-0'>
//                                                             <label>Reply Sheet Date
//                                                     </label>
//                                                             <input readOnly={true}
//                                                                 className='text-left ltr' name='replySheetDate' value={this.state.documentDetail.replySheetDate ? this.state.documentDetail.replySheetDate : ''} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.disc ? 'active' : ''}`}>
//                                                         <label>Discipline
//                                                 </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='disc' value={this.state.documentDetail.disc ? this.state.documentDetail.disc : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.documentDetail.class ? 'active' : ''}`}>
//                                                         <label>Class
//                                                 </label>
//                                                         <input readOnly={true}
//                                                             className='text-left ltr' name='class' value={this.state.documentDetail.class ? this.state.documentDetail.class : ''} />
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                     <div className={`field-form ${this.state.foucs === 'letterNo' || this.state.letterNo !== '' ? 'active' : ''}`}>
//                                                         <label>LET No
//                                                 </label>
//                                                         <input
//                                                             className='text-left ltr'
//                                                             name='letterNo'
//                                                             value={this.state.letterNo}
//                                                             onChange={this.handleChange}
//                                                             onFocus={(e) => this.OnFocus(e.target.name)}
//                                                             onBlur={this.OnBlur}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 {this.state.id!=='' ?
//                                                 <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
//                                                     <div className='field-radio w-100'>
//                                                         <label>
//                                                             status :
//                                                     <span className='star IranSans_Bold'>*</span>
//                                                         </label>
//                                                         <div className='main-radio'>
//                                                             <div className='radio-button mr-auto ml-auto'>
//                                                                 <input className='d-none' type='radio' id='AP' onClick={() => this.setState({ status2: 'AP' })} />
//                                                                 <label htmlFor="AP">
//                                                                     {this.state.status2 === 'AP' ?
//                                                                         <RadioButtonCheckedIcon />
//                                                                         :
//                                                                         <RadioButtonUncheckedIcon />
//                                                                     }
//                                                                 AP
//                                                             </label>
//                                                             </div>
//                                                             <div className='radio-button mr-auto ml-auto'>
//                                                                 <input className='d-none' type="radio" id="AN" onClick={() => this.setState({ status2: 'AN' })} />
//                                                                 <label htmlFor="AN">
//                                                                     {this.state.status2 === 'AN' ?
//                                                                         <RadioButtonCheckedIcon />
//                                                                         :
//                                                                         <RadioButtonUncheckedIcon />
//                                                                     }
//                                                                 AN
//                                                             </label>
//                                                             </div>
//                                                             <div className='radio-button mr-auto ml-auto'>
//                                                                 <input className='d-none' type="radio" id="NCM" onClick={() => this.setState({ status2: 'NCM' })} />
//                                                                 <label htmlFor="NCM">
//                                                                     {this.state.status2 === 'NCM' ?
//                                                                         <RadioButtonCheckedIcon />
//                                                                         :
//                                                                         <RadioButtonUncheckedIcon />
//                                                                     }
//                                                                 NCM
//                                                             </label>
//                                                             </div>
//                                                             <div className='radio-button mr-auto ml-auto'>
//                                                                 <input className='d-none' type="radio" id="CM" onClick={() => this.setState({ status2: 'CM' })} />
//                                                                 <label htmlFor="CM">
//                                                                     {this.state.status2 === 'CM' ?
//                                                                         <RadioButtonCheckedIcon />
//                                                                         :
//                                                                         <RadioButtonUncheckedIcon />
//                                                                     }
//                                                                 CM
//                                                             </label>
//                                                             </div>
//                                                             <div className='radio-button mr-auto ml-auto'>
//                                                                 <input className='d-none' type="radio" id="RJ" onClick={() => this.setState({ status2: 'RJ' })} />
//                                                                 <label htmlFor="RJ">
//                                                                     {this.state.status2 === 'RJ' ?
//                                                                         <RadioButtonCheckedIcon />
//                                                                         :
//                                                                         <RadioButtonUncheckedIcon />
//                                                                     }
//                                                                 RJ
//                                                             </label>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 :''}

//                                             {this.state.id !== '' ? this.handleShow() : ''}
//                                             {this.state.status2 !== '' ?
//                                                 <React.Fragment>
//                                                     <div className='title-password col-12'>
//                                                         <h2 className='IranSans_Bold'>Consultant</h2>
//                                                         <div className='line mr-0 ml-3'></div>
//                                                     </div>
//                                                     {this.state.approvedBy ?
//                                                         <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//                                                             <div className={`field-form`}>
//                                                                 <label>{`${this.state.approvedBy.first_name} ${this.state.approvedBy.last_name}`}
//                                                                     <span className='star IranSans_Bold'>*</span>
//                                                                 </label>
//                                                                 <label className='upload-label signEnglish' onClick={() => this.setState({ popUp: true, pictureShow: this.state.approvedBy.sign })}>
//                                                                     sign
//                                                                     <AttachFileIcon />
//                                                                 </label>
//                                                             </div>
//                                                         </div>
//                                                         :
//                                                         ''
//                                                     }
//                                                     {this.state.popUp ?
//                                                         <Sign close={(e) => this.setState({ popUp: e, pictureShow: '' })} pictureShow={this.state.pictureShow} />
//                                                     : ''}
//                                                 </React.Fragment>
//                                                 : ''
//                                             }
//                                             {this.state.id === ''?
//                                             ''
//                                             :
//                                             <div className='submit-form justify-content-end col-12 mt-3 mb-3'>
//                                                     <button className='justify-content-center' 
//                                                     onClick={() => this.handleSubmit('')}
//                                                     disabled={this.state.disabledButton}
//                                                     >
//                                                     ثبت اطلاعات
//                                                         {this.state.loading === 'submit' ?
//                                                             <Loading className='form-loader' />
//                                                             :
//                                                             <DoneIcon />
//                                                         }
//                                                     </button>
//                                                     <button 
//                                                     className='ml-3 continue justify-content-center'
//                                                     onClick={() => this.handleSubmit('continue')}
//                                                     disabled={this.state.disabledButton}
//                                                     >
//                                                     ثبت و ادامه
//                                                     {this.state.loading === 'submit-continue' ?
//                                                         <Loading className='form-loader mr-0 ml-1' />
//                                                         :
//                                                         <DoneIcon className='mr-0 ml-1' />
//                                                     }
//                                                 </button>
//                                             </div>
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> 
//         </div>
//         )
//     }
// }
// }
// }
// class Sign extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         return (
//             <div className='backGroundPopup' onClick={() => this.props.close(false)}>
//                 <div className='col-xl-6 col-lg-10 col-12'>
//                     <img src={this.props.pictureShow} alt='sign' />
//                 </div>
//             </div>
//         )
//     }
// }