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
import Notification from '../notification/notification'
import Message from '../notification/Message'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// import SearchIcon from '@material-ui/icons/Search';
import Permision from '../permision/permision'
import PopUpGallery from './PopUpGallery'
export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.Fetch = null
        this.Permision = new Permision()
        this.state = {
            token: Cookies.get('token'),
            list: [],
            preview: false,
            pictureShow: '',
            popUp: false,
            back: false,
            detail: {},
            search: '',
            role: null
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - گالری تصاویر`
        this.fetchData()
    }
    fetchData = () => {
        if (this.state.token) {
            axios.get(`${StaticData.domainIp}/gallery/firstList`, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        let state = response.data.content
                        state['role'] = response.data.role
                        this.setState(state)
                    } else {
                        Notification.notify(Message.text(response.status), 'error');
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error');
                        if (err.response.status === 404) {
                            this.setState({ back: true })
                        }
                    }
                })
        }
    }
    Covertor = (obj) => {
        let allData = []
        for (let value in obj) {
            allData.push(obj[value])
        }
        return allData
    }
    handleclass = (key) => {
        if (key === 0) {
            return 'third'
        } else if (key === 1) {
            return 'second'
        } else if (key === 2) {
            return 'first'
        }
    }
    render() {
        if (this.state.token === undefined) {
            return <Redirect to='/Login' />
        } else if (this.state.back) {
            return <Redirect to='/404' />
        }
        else return (
            <div className='main'>
                <div className='col-12 p-0'>
                    <div className='row m-0'>
                        <Sidebar handleState={(name, value) => this.setState({ [name]: value })} />
                        <div className={`${this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                            <Menu nameRole='gallery' nameUrl={this.props.nameUrl} />
                            <div className='w-100 row m-0 main-box-dashboard'>
                                <div className='boxes-dashboard m-0 pr-0 pl-0'>
                                    <div className='col-12 header-index pr-0 pl-0'>
                                        <div className='row m-0'>
                                            <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                                                <div className='icon-header'>
                                                    {this.Permision.handlePermision(this.state.role, 'gallery_create') ?
                                                        <div className='icon'>
                                                            <Link to='/Create-gallery'>
                                                                <AddCircleIcon />
                                                                <span>
                                                                    ارسال تصویر
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        : ''}
                                                    <div className='icon disabled'>
                                                        <Link to='#'>
                                                            <SystemUpdateAltIcon />
                                                            <span>
                                                                فیلتر بر اساس
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className='icon disabled'>
                                                        <Link to='#'>
                                                            <RefreshIcon />
                                                            <span>
                                                                حذف فیترها
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                                        <div className='main-gallery'>
                                            <div className='header-gallery row m-0'>
                                                {this.state.preview ?
                                                    <React.Fragment>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                                                            <div className='header-gallery-text'>
                                                                {this.state.preview.wbs !== '' ?
                                                                    <div className='header-gallery-text-title'>
                                                                        <label className='red-label mb-0 mr-1'>
                                                                            سطح {this.state.preview.wbs}
                                                                        </label>
                                                                    </div>
                                                                    : ''}
                                                                <div className='header-gallery-text-maindetail'>
                                                                    <div className='paragrtaph col-12'>
                                                                        <p>
                                                                            {this.state.preview.text}
                                                                        </p>
                                                                    </div>
                                                                    <div className='name-date'>
                                                                        <div className='item'>
                                                                            <span>
                                                                                <EditIcon />
                                                                                {this.state.preview.name}
                                                                            </span>
                                                                        </div>
                                                                        <div className='item'>
                                                                            <span>
                                                                                <CalendarTodayRoundedIcon />
                                                                                {this.state.preview.date}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='link-pic'>
                                                                    <div className='title'>
                                                                        <span>
                                                                            مشاهده تصویر با کیفیت بالا
                                                                        </span>
                                                                    </div>
                                                                    <div className='main-link'>
                                                                        {this.Covertor(this.state.preview.img).map((data, key) =>
                                                                            <a className='item-link' href={data} key={key} target="_blank" rel='noreferrer'>
                                                                                <label>
                                                                                    <VisibilityIcon />
                                                                                    تصویر {key + 1}
                                                                                </label>
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                                                            <div className='main-preview'>
                                                                {this.Covertor(this.state.preview.img).map((data, key) =>
                                                                    <img key={key} className={`main-preview-${this.handleclass(key)}`} src={data} alt='' />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    : ''}
                                                <div className='col-12 pt-5'>
                                                    <div className='latest-reports'>
                                                        <div className='latest-reports-title w-100'>
                                                            <div className='latest-reports-title-text col'>
                                                                <span>
                                                                    آخرین گزارشات ارسال شده
                                                                </span>
                                                            </div>
                                                            {this.Permision.handlePermision(this.state.role, 'gallery') ?
                                                                <div className='latest-reports-title-archive'>
                                                                    <a href='/archive-gallery'>
                                                                        مشاهده آرشیو
                                                                        <ArrowBackIcon />
                                                                    </a>
                                                                </div>
                                                                : ''}
                                                        </div>
                                                        <div className='w-100 row m-0'>
                                                            {this.state.list.map((data, key) =>
                                                                <div className='five-item col-lg-3 col-md-4 col-sm-6 col-12' key={key}>
                                                                    <div className='box-gallery' onClick={() => this.setState({ popUp: true, detail: data })}>
                                                                        <div className='image-box'>
                                                                            <img src={data.img['0']} alt={data.name} />
                                                                        </div>
                                                                        <div className='detail-box'>
                                                                            <div className='detail-box-text'>
                                                                                <p>{data.text}</p>
                                                                            </div>
                                                                            <div className='detail-box-items row m-0'>
                                                                                <div className='item col-12 p-0'>
                                                                                    <span>
                                                                                        <ImageIcon />
                                                                                        {data.name}
                                                                                    </span>
                                                                                </div>
                                                                                <div className='item col-6 p-0 mt-1'>
                                                                                    <span>
                                                                                        <CalendarTodayIcon />
                                                                                        {data.date}
                                                                                    </span>
                                                                                </div>
                                                                                <div className='item col-6 p-0 mt-1'>
                                                                                    <span>
                                                                                        <LocationOnIcon />
                                                                                        {data.location}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.popUp ?
                    <PopUpGallery
                        close={(e) => this.setState({ popUp: e, detail: '' })}
                        detail={this.state.detail}
                        Covertor={this.Covertor}
                        fetchData={this.fetchData}
                        role={this.state.role}
                    />
                    :
                    ''
                }
            </div>
        )
    }
}
// class PopUpGallery extends Component {
//     constructor(props) {
//         super(props);
//         this.Permision = new Permision()
//         this.state = {
//             select: 0,
//             confirm: false,
//             loading: '',
//             token: Cookies.get('token'),
//         }
//     }
//     componentDidMount() {
//         this.setState({ role: this.props.role })
//     }
//     componentWillReceiveProps(nextProps) {
//         if (this.props !== nextProps) {
//             this.props = nextProps
//             this.setState({ role: this.props.role })
//         }
//     }
//     changeSilde = (status) => {
//         switch (status) {
//             case 'left':
//                 if (this.props.Covertor(this.props.detail.img)[this.state.select - 1]) {
//                     this.setState({ select: this.state.select - 1 })
//                 }
//                 break;
//             case 'right':
//                 if (this.props.Covertor(this.props.detail.img)[this.state.select + 1]) {
//                     this.setState({ select: this.state.select + 1 })
//                 }
//                 break;
//             default:
//                 return false;
//         }
//     }
//     handleDelete = async () => {
//         if (this.props.detail.id) {
//             this.setState({ loading: 'delete' })
//             let datareg = await new FormData()
//             await datareg.append('id', this.props.detail.id)
//             await axios({
//                 method: 'post',
//                 url: `${StaticData.domainIp}/gallery/deleteGallery`,
//                 data: datareg,
//                 headers: {
//                     'Authorization': this.state.token ? `Bearer ${this.state.token}` : null
//                 },
//             })
//                 .then(async (response) => {
//                     await this.setState({ loading: '' })
//                     if (response.status === 200) {
//                         await Notification.notify(Message.text(909), 'success');
//                         await this.props.fetchData()
//                         await this.props.close(false)
//                     } else {
//                         await Notification.notify(Message.text(response.status), 'error');
//                         await this.props.close(false)
//                     }
//                 })
//                 .catch((err) => {
//                     this.setState({ loading: '' })
//                     this.props.close(false)
//                     if (err.response) {
//                         Notification.notify(Message.text(err.response.status), 'error');
//                     }
//                 })
//         }
//     }
//     render() {
//         return (
//             <div className='backGroundPopup'>
//                 <div className='col-xl-10 col-lg-10 col-12 h-100 d-flex align-items-center'>
//                     <div className='box-gallery-popup row m-0'>
//                         <div className='box-gallery-popup-close'>
//                             <button onClick={() => this.props.close(false)}>
//                                 <CloseIcon />
//                             </button>
//                         </div>
//                         <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 h-100'>
//                             <div className='box-gallery-popup-detail'>
//                                 <div className='100 main-item'>
//                                     <div className='box-gallery-popup-detail-item'>
//                                         <div className='w-100'>
//                                             <h4>توضیحات تصویر</h4>
//                                             <span>{this.props.detail.text}</span>
//                                         </div>
//                                     </div>
//                                     <div className='box-gallery-popup-detail-item'>
//                                         <div className='w-100'>
//                                             <h4>درس آموخته ها</h4>
//                                             <span>{this.props.detail.learned_lessons}</span>
//                                         </div>
//                                         <div className='box-shadow'></div>
//                                     </div>
//                                 </div>
//                                 <div className='box-gallery-popup-detail-item sender'>
//                                     <div className='col-8 p-0 h-100 row m-0 align-items-center'>
//                                         <div className='item'>
//                                             <label>
//                                                 ارسال کننده :
//                                             </label>
//                                             <span>
//                                                 {this.props.detail.name}
//                                             </span>
//                                         </div>
//                                         <div className='item'>
//                                             <label>
//                                                 تاریخ ارسال :
//                                             </label>
//                                             <span>
//                                                 {this.props.detail.date}
//                                             </span>
//                                         </div>
//                                         <div className='item'>
//                                             <label>
//                                                 لوکیشن تصاویر :
//                                             </label>
//                                             <span>
//                                                 {this.props.detail.location}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className='col-4 p-0 h-100 main-action-gallery'>
//                                         {this.Permision.handlePermision(this.state.role, 'gallery_delete') ?
//                                             <div className='item-action delete' onClick={() => this.setState({ confirm: true })}>
//                                                 <span>
//                                                     <DeleteIcon />
//                                                 </span>
//                                             </div>
//                                             : ''}
//                                         {this.Permision.handlePermision(this.state.role, 'gallery_edit') ?
//                                             <div className='item-action edit'>
//                                                 <Link to={`/edit-gallery-${this.props.detail.id}`} target='_blank' rel='noreferrer'>
//                                                     <span>
//                                                         <EditIcon />
//                                                     </span>
//                                                 </Link>
//                                             </div>
//                                             : ''}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 h-100'>
//                             <div className='box-gallery-popup-images'>
//                                 {this.props.Covertor(this.props.detail.img)[this.state.select + 1] ?
//                                     <button className='change-slide right' onClick={() => this.changeSilde('right')}>
//                                         <ArrowForwardIcon />
//                                     </button>
//                                     : ''}
//                                 {this.props.Covertor(this.props.detail.img).map((data, key) =>
//                                     this.state.select === key ?
//                                         <img src={data} key={key} alt='' />
//                                         : ''
//                                 )}
//                                 {this.props.Covertor(this.props.detail.img)[this.state.select - 1] ?
//                                     <button className='change-slide left' onClick={() => this.changeSilde('left')}>
//                                         <ArrowBackIcon />
//                                     </button>
//                                     : ''}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {this.state.confirm ?
//                     <PopupConfirm
//                         handleSubmit={this.handleDelete}
//                         close={(e) => this.setState({ confirm: e })}
//                         number={this.props.detail.name}
//                         label={'عکس های'}
//                         loading={this.state.loading}
//                     />
//                     : ''}
//             </div>
//         )
//     }
// }