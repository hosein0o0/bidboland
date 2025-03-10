import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import Loading from '../layout/loading'
function AdvanceSearchDate(props) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    return (
        <div className={`backGroundPopup`}>
            <div className='col-xl-4 col-lg-5 col-md-8 col-12'>
                <div className='box-wellcome'>
                    <div className='main-form main-upload-info'>
                        <div className='title-wellcome'>
                            <span className='col p-0 align-items-center d-flex'>
                                <SearchIcon className='ml-1' />
                                جستجوی پیشرفته
                            </span>
                            <CloseIcon
                                onClick={() => props.handleState('openSearch', false)}
                            />
                        </div>
                        <div className='form row justify-content-start'>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div className={`field-form persian ${startDate ? 'active' : ''}`}>
                                    <div className='icon-field'>
                                        <DateRangeRoundedIcon />
                                    </div>
                                    <div className='col p-0'>
                                        <label>
                                            از تاریخ
                                            <span className='star IranSans_Bold'>*</span>
                                        </label>
                                        <DatePicker
                                            persianDigits={true}
                                            isGregorian={false}
                                            timePicker={false}
                                            onChange={startDate => setStartDate(startDate)}
                                            // onChange={startDate => props.handleState('startDate', startDate)}
                                            value={startDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div className={`field-form persian ${endDate ? 'active' : ''}`}>
                                    <div className='icon-field'>
                                        <DateRangeRoundedIcon />
                                    </div>
                                    <div className='col p-0'>
                                        <label>
                                            تا تاریخ
                                            <span className='star IranSans_Bold'>*</span>
                                        </label>
                                        <DatePicker
                                            persianDigits={true}
                                            isGregorian={false}
                                            timePicker={false}
                                            onChange={endDate => setEndDate(endDate)}
                                            value={endDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>

                                <div className='submit-upload mt-4 row mr-0 ml-0'>
                                    <div className='col-xl-9 col-lg-8 col-md-8 col-7 pr-0 pl-1'>
                                        <button className='accept cursor'
                                            onClick={() => props.handleAdvande(startDate, endDate)}
                                            disabled={props.state.disabled}
                                        >

                                            {props.state.loading === 'submit' ?
                                                <Loading className='form-loader' />
                                                :
                                                <DoneIcon className='ml-1' />
                                            }
                                            ثبت اطلاعات
                                        </button>
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-md-4 col-5 pr-1 pl-0'>
                                        <button className='closeButton cursor'
                                            onClick={() => props.handleState('openSearch', false)}
                                        >
                                            بستن
                                        </button>
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
export default AdvanceSearchDate