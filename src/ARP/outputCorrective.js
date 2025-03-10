import React from "react";
const OutputCorrective = props => {
    const { ManageDownloadFile, pdfCorrective, xlsCorrective } = props
    return (
        <React.Fragment>
            <button
                className='pointer xls w-auto'
                onClick={() => ManageDownloadFile(xlsCorrective)}
            >
                <img src='/img/XLS.svg' alt='xls' />
                خروجی اکسل اقدامات
            </button>
            <button
                className='pointer pdf w-auto'
                onClick={() => ManageDownloadFile(pdfCorrective)}
            >
                <img src='/img/PDF.svg' alt='PDF' />
                خروجی pdf اقدامات
            </button>
        </React.Fragment>
    )
}
export default OutputCorrective