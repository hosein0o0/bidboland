import React from "react";
import { Close } from "@material-ui/icons";
import handleCheckText from "../../../handleCheckText";
const Files = props => {
    const { state, APINote } = props
    const { attachment } = state
    const { deleteFileList } = APINote
    return (
        <div className="manage-files justify-content-end d-flex">
            <div className="p-0 col-xl-12 col-lg-12 col-md-12 col-12 row m-0">
                {attachment?.map((data, key) =>
                    <div className={`col-xl-6 col-lg-6 col-md-6 col-12 ${key % 2 === 0 ? 'pr-0' : 'pl-0'}`}>
                        <div className="file d-flex ltr align-items-center" key={key}>
                            <label className="mb-0 name ltr d-flex align-items-center">
                                <a href={data.url}>
                                    {data.name}
                                    {handleCheckText(data.size) &&
                                        <span className="size">({data.size})</span>
                                    }
                                </a>
                            </label>
                            <div className="col p-0 d-flex align-items-center justify-content-end">
                                <Close className="pointer" onClick={() => deleteFileList(key, 'attachment')} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Files