import React from "react";
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
const ToCC = ({ convertDate, data }) => {
    console.log(convertDate, data)
    return (
        <div className="w-100 row m-0">
            <div className="col-xl-4 col-lg-4 col-md-4 col-12 p-0">
                <div className="item-select d-flex align-items-center">
                    <label className="pl-2 mb-0 label">فرستنده:</label>
                    <input
                        disabled={true}
                        readOnly={true}
                        value={handleString(data?.send_from)}
                        className={`input-tocc ${handleCheckText(data?.send_from) ? 'active' : ''}`}
                    />
                </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-12 p-0">
                <div className="item-select d-flex align-items-center">
                    <label className="pl-2 mb-0 label">گیرنده:</label>
                    <input
                        disabled={true}
                        readOnly={true}
                        value={handleString(data?.recieve_to)}
                        className={`input-tocc ${handleCheckText(data?.recieve_to) ? 'active' : ''}`}
                    />
                </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-12 p-0">
                <div className="item-select d-flex align-items-center">
                    <label className="pl-2 mb-0 label">تاریخ:</label>
                    <input
                        disabled={true}
                        readOnly={true}
                        value={convertDate(handleString(data?.created_at))}
                        className={`input-tocc IranSans_Medium_FA ${handleCheckText(data?.created_at) ? 'active' : ''}`}
                    />
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 p-0">
                <div className="mt-0 item-select d-flex align-items-center">
                    <label className="pl-2 mb-0 label">سایر گیرنده‌ها:</label>
                    <input
                        disabled={true}
                        readOnly={true}
                        value={handleString(data?.cc)}
                        className={`input-tocc ${handleCheckText(data?.cc) ? 'active' : ''}`}
                    />
                </div>
            </div>
        </div>
    )
}
export default ToCC