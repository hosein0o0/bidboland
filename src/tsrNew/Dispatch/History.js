import React from "react";
import handleString from "../../handleString";
import moment from "moment-jalaali";
import handleCheckText from "../../handleCheckText";
const History = ({ list }) => {
    const ConvertDate = date => {
        let convert = moment(date, 'YYYY-MM-DD HH:mm').locale('fa').format(' HH:mm - jYYYY/jMM/jDD ')
        return convert
    }
    return (
        <div className='col-12'>
            <div className='history-dispatch'>
                <label className='IranSans_Bold_FA'>
                    تاریخچه دستگردانی
                </label>
                {list.map((data, key) =>
                    <div className='w-100 my-1 d-flex align-items-center' key={key}>
                        <label className="d-flex mb-0">
                            {handleString(data.label)}
                            <span className="user_role">
                                {handleString(data.user_role)}
                            </span>
                        </label>
                        <span className="doted col"></span>
                        {handleCheckText(handleString(data.dispatch_at)) &&
                            <span className="IranSans_Medium_FA">
                                {ConvertDate(handleString(data.dispatch_at))}
                            </span>
                        }
                        <span className="change_by">
                            ویرایش توسط :
                            {handleString(data.change_by)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default History