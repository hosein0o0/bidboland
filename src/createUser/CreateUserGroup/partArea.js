import React from "react";
import CreatableSelect from 'react-select/creatable'
const PartArea = props => {
    const { handleState, index, handleListArea, value, setValues, values } = props
    const handleChange = newValue => {
        if (index === 0) handleState({ category_id: newValue })
        let vals = values || []
        vals[index] = newValue
        setValues(prevState => {
            return [...prevState]
        })
    }
    const array = handleListArea(index)
    return (
        <div className="w-100">
            <div className='title-password w-100 mt-3 mb-2'>
                <div className='line'></div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div className='field-form selectBox'>
                    <CreatableSelect
                        onChange={newValue => handleChange(newValue)}
                        value={value}
                        options={array}
                        placeholder={
                            <label className='rtl'>
                                {index === 0 ? 'بخش / حوزه اصلی' : 'بخش / حوزه فرعی'}
                                <span className='star IranSans_Bold'>
                                    *
                                </span>
                            </label>
                        }
                    />
                </div>
            </div>
        </div>
    )
}
export default PartArea