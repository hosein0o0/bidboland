import React from "react";
import handleCheckText from "../../handleCheckText";
import handleString from "../../handleString";
import CheckPersianText from "../../CheckPersianText";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import CreatableSelect from 'react-select/creatable'
const ItemOffice = props => {
    const { handleDisabledAPIElm, handleDelete, handleManageListOffice } = props.API
    const { foucs
        // , office_list
    } = props.state
    const state_name = props.name
    const check_disabled = handleDisabledAPIElm() ? true : false
    const data = props.data || {}
    const key = props._key
    const length = props.length
    function handleChange(e) {
        const { name, value } = e.target
        const { handleChangeList } = props.API
        handleChangeList(state_name, name, handleString(value), key)
    }
    function handleClassname(name) {
        let state1 = handleCheckText(data[name])
        let state2 = foucs === `${state_name}_${name}_${key}`
        let result = state1 || state2
        return result ? 'active' : ''
    }
    function handlechangeOffice(newValue) {
        const { handleChangeList } = props.API
        handleChangeList(state_name, 'officeName', newValue, key)
    }
    let state1_rm = check_disabled ? false : true
    let state2_rm = length > 1
    const show_rm = state1_rm && state2_rm
    // const list = office_list || []
    const list = handleManageListOffice()
    return (
        <div className='w-100 mr-0 ml-0 row' key={key}>
            <div className='title-password list-counter col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold_FA'>{key + 1}</h2>
                <div className='line'></div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12' key={key}>
                <div className='field-form selectBox'>
                    <CreatableSelect
                        onChange={newValue => handlechangeOffice(newValue, data)}
                        options={list}
                        value={data.officeName || null}
                        isDisabled={check_disabled}
                        placeholder={
                            <label className='ltr'>
                                نام اداره
                            </label>
                        }
                    />
                </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div className={`field-form persian ${handleClassname('number')}`} >
                    <label>
                        تعداد نسخه
                    </label>
                    <input
                        type='number'
                        className={`text-left IranSans_Medium_FA ${CheckPersianText(data.number) ? 'rtl' : 'ltr'}`}
                        onChange={handleChange}
                        name='number'
                        value={handleString(data.number)}
                        onFocus={() => props.OnFocus(`${state_name}_number_${key}`)}
                        onBlur={() => props.OnBlur()}
                        disabled={check_disabled}
                        readOnly={check_disabled}
                    />
                </div>
            </div>
            {show_rm &&
                <div className='button-add col-12 row mr-0 ml-0'>
                    <button className='remove'
                        onClick={() => handleDelete(state_name, key)}
                    >
                        <DeleteRoundedIcon />
                        حذف
                    </button>
                </div>
            }
        </div>
    )
}
export default ItemOffice