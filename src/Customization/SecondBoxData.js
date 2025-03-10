import React from 'react'
import StaticData from '../staticData'
import handleCheckText from '../handleCheckText'
import CheckDownload from '../CheckDownload'
import handleString from '../handleString'
const SecondBoxData = props => {
  const { secondData, revision } = props.state
  function handleList () {
    let { transmitallNumber } = secondData
    let url
    const check = handleCheckText(transmitallNumber)
    if (check) {
      let baseUrl = `${StaticData.link_file}/upload/dcc/Engineering/Documents/${transmitallNumber}`
      let pdf = `${`${transmitallNumber}`}.pdf`
      let _PDF = `${`${transmitallNumber}`}.PDF`
      if (CheckDownload(`${baseUrl}/${pdf}`)) {
        url = `${baseUrl}/${pdf}`
      } else if (CheckDownload(`${baseUrl}/${_PDF}`)) {
        url = `${baseUrl}/${_PDF}`
      }
    }
    return url
  }
  function DocumentLink () {
    const { transmitallNumber, documentNumber } = secondData
    let url
    const check =
      handleCheckText(transmitallNumber) &&
      handleCheckText(documentNumber) &&
      handleCheckText(revision)
    if (check) {
      let baseUrl = `${StaticData.link_file}/upload/dcc/Engineering/Documents/${transmitallNumber}`
      let pdf = `${`${documentNumber}_${revision}`}.pdf`
      let _PDF = `${`${documentNumber}_${revision}`}.PDF`
      if (CheckDownload(`${baseUrl}/${pdf}`)) {
        url = `${baseUrl}/${pdf}`
      } else if (CheckDownload(`${baseUrl}/${_PDF}`)) {
        url = `${baseUrl}/${_PDF}`
      }
    }
    return url
  }
  function CommentLink (item) {
    let url
    const { commentNumber } = item
    const check = handleCheckText(commentNumber)
    if (check) {
      let baseUrl = `${StaticData.link_file}/upload/dcc/Engineering/CommentSheet`
      let pdf = `${commentNumber}.pdf`
      let _PDF = `${commentNumber}.PDF`
      if (CheckDownload(`${baseUrl}/${pdf}`)) {
        url = `${baseUrl}/${pdf}`
      } else if (CheckDownload(`${baseUrl}/${_PDF}`)) {
        url = `${baseUrl}/${_PDF}`
      }
    }
    return url
  }
  function FilterDetail () {
    const details = secondData.details ? secondData.details : []
    const filter = details.filter(
      _data =>
        CheckText(_data.commentDate) &&
        CheckText(_data.commentNumber) &&
        CheckText(_data.commentStatus) &&
        CheckText(_data.replyNumber) &&
        CheckText(_data.replyStatus)
    )
    return filter
  }
  function CheckText (text) {
    const check = handleCheckText(text) && text !== '-'
    return check
  }
  return (
    <div className={`second-box`}>
      <div className='col-12 p-0 row m-0'>
        <div className='col-6'>
          <div className='item'>
            <span>Transmittal No.</span>
            <label>{secondData.transmitallNumber}</label>
            {handleList() && props.permision && (
              <a href={handleList()} target='_blank' rel='noreferrer'>
                مشاهده جزئیات
              </a>
            )}
          </div>
        </div>
        <div className='col-6'>
          <div className='item'>
            <span>POI</span>
            <label>{handleString(secondData.poi)}</label>
          </div>
        </div>
        <div className='col-6'>
          <div
            className={`item ${
              DocumentLink() && props.permision ? 'hashover' : ''
            }`}
          >
            <span>Document</span>
            <label>{secondData.documentNumber}</label>
            {DocumentLink() && props.permision && (
              <div className='hover-link rtl'>
                <div className='second-item my-1'>
                  <a href={DocumentLink()} target='_blank' rel='noreferrer'>
                    PDF
                  </a>
                </div>
              </div>
            )}
            {/* <div className='second-item my-1'>
                <span
                  className='emulator-link w-100 h-100 mx-0'
                  onClick={() => CheckFormat()}
                  // href={`${
                  //   StaticData.domainIp
                  // }/upload1/Package_A-ENG_Final_Data_Book/${secondData.transmitallNumber}/Native/`}
                >
                  Native
                </span>
              </div> */}
          </div>
        </div>
        <div className='col-6'>
          <div className='item'>
            <span>Date</span>
            <label>{secondData.issuedDate}</label>
          </div>
        </div>
        <div className='col-6'>
          <div
            className={`item ${
              FilterDetail().length > 0 && props.permision ? 'hashover' : ''
            }`}
          >
            <span>Comment Sheet</span>
            <label>{secondData.issuedDate}</label>
            {FilterDetail().length > 0 && props.permision && (
              <div className='hover-link rtl'>
                {FilterDetail().map(
                  (item, key) =>
                    CommentLink(item) && (
                      <div className='second-item my-1' key={key}>
                        <a
                          href={CommentLink(item)}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {handleString(item.commentNumber)}
                        </a>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <div className='col-6'>
          <div className='item'>
            <span>comment Date</span>
            {/* <label>{secondData.commentDate}</label> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SecondBoxData
