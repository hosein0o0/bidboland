import React, { Component } from 'react';
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import StaticData from '../../staticData'
import Creater from './Creater'
export default class TqFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: Cookies.get('token'),
        }
    }
    componentDidMount() {
        document.title = `${StaticData.Title} - Technical Request TQ`
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
                            <Menu nameRole='TQ_create' nameUrl={this.props.nameUrl}/>
                            <div className='w-100 row m-0 main-box-dashboard'>
                                <div className='boxes-dashboard row m-0 p-0'>
                                    <div className='main-form'>
                                        <div className='title-from'>
                                            <h2>درخواست فنی</h2>
                                        </div>
                                        <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                                            <div className='form row justify-content-start'>
                                                <Creater />
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