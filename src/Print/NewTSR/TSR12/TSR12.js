import React from "react";
import Header from '../Header/Header'
import Date from "./Date";
import ResultReview from "./ResultReview";
import TextAreaWithRotate from "../TextAreaWithRotate";
import Sign from '../Sign/Sign'
const TSR12 = props => {
    const { effective } = props.data
    return (
        <page className='portrate'>
            <div className='holder'>
                <div className='holder_right position-relative flex-custome'>
                    <div className='rotate flex-custome'>
                        <span className='rotate-180'>
                            (این صفحه توسط واحد متقاضی، شش ماه پس از صورتجلسه پایان كار، تكميل می گردد.)
                        </span>
                    </div>
                </div>
                <div className='holder_left'>
                    <Header {...props} />
                    <div className='___mainSign'>
                        <p className='b f16 tealc pb_1mm'>
                            صفحه دوازدهم- ارزيابی اثر بخشی
                        </p>
                        <Date {...props} label='تاريخ صورتجلسه تائيد پايان كار:' name_state='end_work_date' />
                        <Date {...props} label='تاريخ شروع بهره برداري:' name_state='operation_start_date' />
                        <ResultReview {...props} />
                        {/* {effective === '1' &&
                        } */}
                        <TextAreaWithRotate
                            {...props}
                            boxText={true}
                            label='نوع اثر بخشی :'
                            value={'effective_type'}
                        />
                        <TextAreaWithRotate
                            {...props}
                            boxText={true}
                            label='توضيحات'
                            value={'description'}
                            father_classname={effective === '1' ? 'mb-0' : ''}
                        />
                        {/* {effective === '0' &&
                        } */}
                        <TextAreaWithRotate
                            {...props}
                            boxText={true}
                            label='راهکار هاي پيشنهادي در صورت اثر بخش نبودن TSR'
                            value={'suggested_ways'}
                            father_classname='mb-0'
                        />
                        <Date {...props} label='شماره TSR جدید:' name_state='new_tsr_no' />
                        <Sign {...props} id={12} />
                    </div>
                </div>
            </div>
        </page>
    )
}
export default TSR12