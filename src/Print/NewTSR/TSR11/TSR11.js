import React from "react";
import Header from '../Header/Header'
import TypeDocuments from "./TypeDocuments";
import Documents from "./Documents";
import Office from "./Office";
import Sign from '../Sign/Sign'

const TSR11 = props => {
    return (
        <page className='portrate'>
            <div className='holder'>
                <div className='holder_right position-relative flex-custome'>
                    <div className='rotate flex-custome'>
                        <span className='rotate-180'>
                            (این صفحه توسط مسئول TSR ، تكميل می گردد.)
                        </span>
                    </div>
                </div>
                <div className='holder_left'>
                    <Header {...props} />
                    <div className='___mainSign'>
                        <p className='b f16 tealc pb_1mm'>
                            صفحه يازدهم- تحويل نقشه هاي As Built
                        </p>
                        <TypeDocuments {...props} />
                        <Documents {...props} label='اسناد جديد' name_state='new_document_attachment' />
                        <Documents {...props} label='اسناد ويرايش شده' name_state='edited_document_attachment' />
                        <Office {...props} label='توسط مركز اسناد به ادارات زير توزيع گردد:' name_state='documents_distribution' />
                        <Sign {...props} id={11} />
                    </div>
                </div>
            </div>
        </page>
    )
}
export default TSR11