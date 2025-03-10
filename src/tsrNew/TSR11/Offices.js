import React from "react";
import handleString from "../../handleString";
import ItemOffice from "./ItemOffice";
import AddIcon from '@material-ui/icons/Add'
const Offices = props => {
    const list = props.state[props.name] || []
    const length = list.length
    const { handleDisabledAPIElm, handleAdd } = props.API
    const can_add = handleDisabledAPIElm() ? false : true
    return (
        <div className='w-100 row mx-0'>
            <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>{handleString(props.label)}</h2>
                <div className='line'></div>
            </div>
            {list.map((data, key) =>
                <ItemOffice
                    data={data || {}}
                    key={key}
                    _key={key}
                    {...props}
                    length={length}
                />
            )}
            {can_add &&
                <div className='button-add col-12'>
                    <button
                        onClick={() => handleAdd(props.name)}
                    >
                        <AddIcon />
                        افزودن مورد جدید
                    </button>
                </div>
            }
        </div>
    )
}
export default Offices