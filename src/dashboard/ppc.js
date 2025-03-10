import React, { Component } from 'react';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
export default class dashboardPPC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxes: [
                {
                    text: 'آخرین وضعیت',
                    icon: (e) => <EqualizerRoundedIcon style={{ fill: e }} />,
                    backColor: '#ffebed',
                    textColor: '#f44236',
                    path: `/dashboard-PPC`,
                    target: '_blank',
                    permission: ['']
                },
                {
                    text: 'مدیریت تولید',
                    icon: (e) => <ShoppingCartRoundedIcon style={{ fill: e }} />,
                    backColor: '#f3e5f6',
                    textColor: '#9c28b1',
                    path: `/dashboard-project-engineering`,
                    permission: ['project_engineering', 'main_transmittal', 'secondary_transmittal']
                },
                {
                    text: 'مدیریت تقاضا',
                    icon: (e) => <ImportExportRoundedIcon style={{ fill: e }} />,
                    backColor: '#e8eaf6',
                    textColor: '#3f51b5',
                    path: '/technical-document',
                    permission: ['pfd', 'p&id', 'line_list', 'isometric', 'instrument', '3d_model']
                },
                {
                    text: 'کنترل موجودی',
                    icon: (e) => <TrendingUpRoundedIcon style={{ fill: e }} />,
                    backColor: '#e1f5fe',
                    textColor: '#03a9f5',
                    permission: ['']
                },
                {
                    text: 'مدیریت پسماند',
                    icon: (e) => <DeleteSweepRoundedIcon style={{ fill: e }} />,
                    backColor: '#e0f2f2',
                    textColor: '#009788',
                    permission: ['']
                },
                {
                    text: 'مدیریت ریسک',
                    icon: (e) => <WarningRoundedIcon style={{ fill: e }} />,
                    backColor: '#ebfadb',
                    textColor: '#82c236',
                    permission: ['']
                },
                {
                    text: 'تقویم',
                    icon: (e) => <DateRangeRoundedIcon style={{ fill: e }} />,
                    backColor: '#fffcdf',
                    textColor: '#f9a825',
                    path: '/calendar',
                    permission: ['']
                },
                {
                    text: 'مدیریت جلسات',
                    icon: (e) => <SupervisorAccountRoundedIcon style={{ fill: e }} />,
                    backColor: '#fff2df',
                    textColor: '#ef6c00',
                    path: '/create-meeting',
                    permission: ['']
                },
                {
                    text: 'دفترچه یادداشت',
                    icon: (e) => <LibraryBooksRoundedIcon style={{ fill: e }} />,
                    backColor: '#fbe4ec',
                    textColor: '#ea1e63',
                    path: '/#',
                    permission: ['']
                },
                {
                    text: 'گالری تصاویر',
                    icon: (e) => <PhotoLibraryRoundedIcon style={{ fill: e }} />,
                    backColor: '#e8f6e9',
                    textColor: '#4cb050',
                    path: '/gallery',
                    permission: ['gallery']
                },
                {
                    text: 'کتابخانه دارا',
                    icon: (e) => <MenuBookRoundedIcon style={{ fill: e }} />,
                    backColor: '#eee8f6',
                    textColor: '#673bb7',
                    path: '/dashboard_library',
                    permission: ['standard_bank']
                },
                {
                    text: 'پست الکترونیک',
                    icon: (e) => <AlternateEmailRoundedIcon style={{ fill: e }} />,
                    backColor: '#e4f2fd',
                    textColor: '#1d89e4',
                    permission: ['email_management']
                },
            ],
            number: null,
        }
    }
    render() {
        return (
            this.state.boxes.map((box, key) =>
                this.props.handleCheckRole(box.permission) &&
                <div
                    key={key}
                    className='col-xl-3 col-lg-4 col-md-6 col-12 p-2 main-box'
                >
                    <a
                        className='link-box-dashboard'
                        href={box.path ? box.path : '#'}
                    // target={box.target ? box.target : ''}
                    >
                        <div className='box-dashboard'
                            style={this.state.number === key ? { backgroundColor: box.backColor } : null}
                            onMouseOver={() => this.setState({ number: key })}
                            onMouseOut={() => this.setState({ number: null })}
                        >
                            <div className='row m-0'>
                                <div className='icon-box'>
                                    {box.icon(this.state.number === key ? box.textColor : '#363636')}
                                </div>
                                <div className='text-box'>
                                    <span className='IranSans_Bold'
                                        style={this.state.number === key ? { color: box.textColor } : null}>
                                        {box.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        )
    }
}