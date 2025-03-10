import React from "react";
import CreatableSelect from 'react-select/creatable'
import handleString from '../../handleString'
const SecondBox = props => {
    // return 's'
    const { OnFocus, OnBlur, handleChange } = props.API
    const {
        nameGroup,
        office_list,
        offiecTop,
        _groupTiltle,
        foucs,
        unit_list_for_title,
        unitTop,
        _groupName
    } = props.state
    const result = []
    const { handleState } = props

    switch (nameGroup) {
        case 'سایر':
            result.push(
                <div className='w-100 row mx-0'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div
                            className={`field-form persian ${foucs === '_groupTiltle' || _groupTiltle ? 'active' : ''
                                }`}
                        >
                            <label>
                                عنوان
                                <span className='star IranSans_Bold'>*</span>
                            </label>
                            <input
                                type='text'
                                value={handleString(_groupTiltle)}
                                name='_groupTiltle'
                                onFocus={e => OnFocus(e.target.name)}
                                onBlur={OnBlur}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div
                            className={`field-form persian ${foucs === '_groupName' || _groupName ? 'active' : ''
                                }`}
                        >
                            <label>
                                متن
                                <span className='star IranSans_Bold'>*</span>
                            </label>
                            <input
                                type='text'
                                value={handleString(_groupName)}
                                name='_groupName'
                                onFocus={e => OnFocus(e.target.name)}
                                onBlur={OnBlur}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* <div className='col-12'>
                  <p>پر کردن یک فیلد الزامی است</p>
                </div> */}
                </div>
            )
            break
        case 'پیمانکار':
            result.push(
                <div className='w-100 row mx-0'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div
                            className={`field-form persian ${foucs === '_groupTiltle' || _groupTiltle ? 'active' : ''
                                }`}
                        >
                            <label>
                                عنوان
                                <span className='star IranSans_Bold'>*</span>
                            </label>
                            <input
                                type='text'
                                value={handleString(_groupTiltle)}
                                name='_groupTiltle'
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div
                            className={`field-form persian ${foucs === '_groupName' || _groupName ? 'active' : ''
                                }`}
                        >
                            <label>
                                متن
                                <span className='star IranSans_Bold'>*</span>
                            </label>
                            <input
                                type='text'
                                value={handleString(_groupName)}
                                name='_groupName'
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            )
            break
        case 'مدیر':
            result.push(
                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className='field-form selectBox'>
                        <CreatableSelect
                            onChange={newValue =>
                                handleState({
                                    offiecTop: newValue.__isNew__ ? null : newValue
                                })
                            }
                            value={offiecTop}
                            options={office_list}
                            placeholder={
                                <label className='rtl'>
                                    اداره
                                    <span className='star IranSans_Bold'>*</span>
                                </label>
                            }
                        />
                    </div>
                </div>
            )
            break
        case 'رئیس':
            result.push(
                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className='field-form selectBox'>
                        <CreatableSelect
                            onChange={newValue =>
                                handleState({
                                    unitTop: newValue.__isNew__ ? null : newValue
                                })
                            }
                            value={unitTop}
                            options={unit_list_for_title}
                            placeholder={
                                <label className='rtl'>
                                    واحد
                                    <span className='star IranSans_Bold'>*</span>
                                </label>
                            }
                        />
                    </div>
                </div>
            )
            break
        default:
            break
    }
    return result
}
// }
export default SecondBox