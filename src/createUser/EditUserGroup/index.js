import React, { Component } from "react";
import APIEdit from "./API/APIEdit";
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import Category from "./Category";
import SecondBox from "./SecondBox";
import UnitOffice from './UnitOffice'
import Access from './access'
class EditUserGroup extends Component {
    constructor(props) {
        super(props);
        this.API = new APIEdit(this)
        this.Elm = {}
        this.state = {
            token: Cookies.get('token'),
            nameGroup_list: [
                { value: 'رئیس', label: 'رئیس' },
                { value: 'مدیر', label: 'مدیر' },
                { value: 'پیمانکار', label: 'پیمانکار' },
                { value: 'سایر', label: 'سایر' }
            ],
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - ویرایش گروه کاربری`
        const url = window.location.href
        const array = url.split('-') || []
        let id = array[array?.length - 1]
        if (id) {
            this.setState({ id: id })
            const { fetchDateAPI } = this.API
            fetchDateAPI(id)
        }
    }
    handleState = obj => {
        this.setState(obj)
    }
    render() {
        const { token, redirect, _close } = this.state
        if (!token) {
            return <Redirect to='/Login' />
        } else if (redirect) {
            return <Redirect to='/index-user-group' />
        } else {
            return (
                <div className='main'>
                    <div className='col-12 p-0'>
                        <div className='row m-0'>
                            <Sidebar
                                handleState={(name, value) => this.setState({ [name]: value })}
                            />
                            <div className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
                                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                                <div className='w-100 row m-0 main-box-dashboard'>
                                    <div className='boxes-dashboard row m-0 p-0'>
                                        <div className='main-form'>
                                            <div className='title-from'>
                                                <h2>ویرایش گروه کاربری</h2>
                                            </div>
                                            <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                                                <div className='form row justify-content-start persian'>
                                                    <Category {...this} />
                                                    <SecondBox {...this} />
                                                    <UnitOffice {...this} />
                                                    <Access {...this} />
                                                </div>
                                            </div>
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
export default EditUserGroup