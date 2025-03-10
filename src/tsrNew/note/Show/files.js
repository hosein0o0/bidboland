import React from "react";
import handleString from "../../../handleString";
import handleCheckText from "../../../handleCheckText";
const Files = data => {
    const attachment = data.attach || []
    const Name = (value) => {
        let split = value.split('/') || []
        const { length } = split
        const endVal = handleString(split[length - 1])
        return endVal
    }
    return (
        <div className="manage-files justify-content-end d-flex">
            <div className="p-0 col-xl-12 col-lg-12 col-md-12 col-12 row m-0">
                {attachment?.map((value, key) => handleCheckText(Name(handleString(value))) &&
                    <div className={`col-xl-6 col-lg-6 col-md-6 col-12 ${key % 2 === 0 ? 'pr-0' : 'pl-0'}`}>
                        <div className="file d-flex align-items-center ltr" >
                            <label className="mb-0 name d-flex align-items-center overflow-hidden ltr">
                                <a href={value}>
                                    {Name(handleString(value))}
                                </a>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Files