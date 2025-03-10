import React from "react";
const Category = props => {
    const { state, API } = props
    const { OnFocus, handleChangeCategory, OnBlur } = API
    const { nameGroup_list, nameGroup, foucs } = state
    return (
        <>
            <div className='title-password w-100 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>نام گروه کاربری</h2>
                <div className='line'></div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                    className={`field-form persian ${foucs === 'nameGroup' ||
                        nameGroup
                        ? 'active'
                        : ''
                        }`}
                >
                    <label>
                        دسته
                        <span className='star IranSans_Bold'>*</span>
                    </label>
                    <select
                        name='nameGroup'
                        value={nameGroup}
                        onFocus={e => OnFocus(e.target.name)}
                        onBlur={OnBlur}
                        onChange={handleChangeCategory}
                    >
                        <option className='d-none'></option>
                        {nameGroup_list.map((data, key) => (
                            <option value={data.value} key={key}>
                                {data.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}
export default Category