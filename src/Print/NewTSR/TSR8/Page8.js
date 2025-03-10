import React from "react";
import Header from '../Header/Header'
import TextAreaWithRotate from '../TextAreaWithRotate'
import InstructionsHead from './InstructionsHead'
import Attachment from '../Attachment/Attachment'
import PurchaseRequest from './PurchaseRequest'
import Sign from '../Sign/Sign'
// import handleString from "../../../handleString";
const Page8 = props => {
    const dataSend = props.dataSend || {}
    const { value } = dataSend
    return <page className='portrate'>
        <div className='holder'>
            <div className='holder_right position-relative flex-custome'>
                <div className='rotate flex-custome'>
                    <span className='rotate-180'>
                        (این صفحه توسط كارشناس TSR تكميل می گردد.)
                    </span>
                </div>
            </div>
            <div className='holder_left'>
                <Header {...props} />
                <div className='___mainSign'>
                    <p className='b f16 tealc pb_1mm'>
                        صفحه هشتم- دستورالعمل بازرسی فنی
                        {/* ({handleString(label)}) */}
                    </p>
                    <InstructionsHead {...props} />
                    <TextAreaWithRotate
                        {...props}
                        boxText={true}
                        className='halk'
                        label='شرح دستورالعمل بازرسی'
                        value={`${value}_instruction_description`}
                        time={true}
                        timeValue={'execution_date'}
                        laeblTime='زمان اجرا'
                    />

                    <Attachment
                        {...props}
                        foreign={`${value}_foreign_attachment`}
                        internal={`${value}_internal_attachment`}
                    />
                    <PurchaseRequest {...props} />
                    <Sign {...props} id={8}
                        numTab={props.numTab}
                    />
                </div>
            </div>
        </div>
    </page>
}
export default Page8