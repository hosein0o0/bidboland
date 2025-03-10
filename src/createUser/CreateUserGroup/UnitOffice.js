import React from "react";
import CreatableSelect from 'react-select/creatable'
const UnitOffice = props => {
    const { SelectOffice } = props.API
    const { handleState } = props
    const { office, office_list, nameGroup, unit, unit_list } = props.state
    return (
        <div className='w-100'>
            <div className='title-password w-100 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>اداره / واحد</h2>
                <div className='line'></div>
            </div>
            <div className='row mx-0'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className='field-form selectBox'>
                        <CreatableSelect
                            onChange={SelectOffice}
                            value={office}
                            options={office_list}
                            isDisabled={nameGroup === 'پیمانکار'}
                            placeholder={
                                <label className='rtl'>
                                    اداره
                                    <span className='star IranSans_Bold'>
                                        *
                                    </span>
                                </label>
                            }
                        />
                    </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className='field-form selectBox'>
                        <CreatableSelect
                            onChange={newValue =>
                                handleState({ unit: newValue })
                            }
                            value={unit}
                            options={unit_list}
                            isDisabled={office === null}
                            placeholder={
                                <label className='rtl'>
                                    واحد
                                    <span className='star IranSans_Bold'>
                                        *
                                    </span>
                                </label>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UnitOffice