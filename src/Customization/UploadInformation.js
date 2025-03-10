import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import PublishRoundedIcon from '@material-ui/icons/PublishRounded'
import { ExcelRenderer } from 'react-excel-renderer'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Cookies from 'js-cookie'
import handleString from '../handleString'
// import moment from 'moment'
function UploadInformation(props) {
  const [upload, setUpload] = useState(false)
  const [total, setTotal] = useState(0)
  const [counter, setCounter] = useState(0)

  const ExcelDateToJSDate = date => {
    let converted_date = new Date(Math.round((date - 25569) * 864e5))
    converted_date = String(converted_date).slice(4, 15)
    date = converted_date.split(' ')
    let day = date[1]
    let month = date[0]
    month = 'JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(month) / 3 + 1
    if (month.toString().length <= 1) month = '0' + month
    let year = date[2]
    return String(day + '-' + month + '-' + year)
  }

  async function handleImport(event) {
    if (props.linkUpload) {
      await props.handleState('loading', 'excelFile')
      const token = await Cookies.get('token')
      let fileObj = await event.target.files[0]
      await ExcelRenderer(fileObj, async (err, resp) => {
        if (err) {
          await props.handleState('loading', '')
        } else {
          await props.handleState('loading', '')
          setUpload(true)
          let header = resp.rows[0]
          let array = resp.rows.filter(
            (data, key) => data.length === header.length && key > 0
          )
          let length = array.length
          setTotal(length)
          let i = 0
          async function myLoop() {
            setTimeout(async () => {
              let data = array[i]
              if (data) {
                let datareg = await new FormData()
                let obj = {}
                await data.map(async (item, key) => {
                  const exp =
                    header[key] === 'id' ||
                    header[key] === 'created_at' ||
                    header[key] === 'updated_at' ||
                    header[key] === 'Row'
                  if (!exp) {
                    let column = header[key],
                      value = item
                    if (
                      column.includes('Date') ||
                      column.includes('date') ||
                      column.includes('EED') ||
                      column.includes('INS_INS_COR')
                    ) {
                      if (value && value !== '-') {
                        let convert = ExcelDateToJSDate(parseInt(value))
                        let current = convert.replace(/-/g, '/')
                        obj[column] = await current
                        await datareg.append(column.trim(), current)
                      } else {
                        await datareg.append(column.trim(), '-')
                        obj[column.trim()] = '-'
                      }
                    } else if (column.trim() === 'year') {
                      let check = value
                        ? value.toString().includes('(R')
                        : false
                      const delimiter = '(R'
                      let current
                      if (check) {
                        current = value.split(delimiter)
                        current = current ? current[0] : '-'
                        current = current.trim()
                      } else {
                        let convert = ExcelDateToJSDate(parseInt(value))
                        current = convert.replace(/-/g, '/')
                      }
                      obj[column] = await current
                      await datareg.append(column.trim(), current)
                    } else {
                      obj[column.trim()] = handleString(`${value}`)
                      await datareg.append(column.trim(), handleString(`${value}`))
                    }
                  }
                })
                const _url = `${StaticData.domainIp}/${props.linkUpload}`
                await axios({
                  method: 'post',
                  url: _url,
                  data: datareg,
                  headers: {
                    Authorization: token ? `Bearer ${token}` : null
                  }
                })
                  .then(async response => {
                    await console.log(response, obj, i)
                    await props.handleState({ loading: '' })
                    if (response.status === 200) {
                    } else {
                      console.err(response)
                      console.err(obj, i)
                      Notification.notify(
                        Message.text(response.status),
                        'error'
                      )
                    }
                  })
                  .catch(err => {
                    if (err.response) {
                      Notification.notify(
                        Message.text(err.response.status),
                        'error'
                      )
                    }
                  })
                i = (await i) + 1
              }
              await setCounter(i)
              if (i === length) {
                await setUpload(false)
                if (props.RemoveFilter) {
                  await props.RemoveFilter()
                }
                await props.handleState('upload', false)
              }
              if (i < length) {
                await myLoop()
              }
            }, 1)
          }
          await myLoop()
        }
      })
    }
  }
  function ShowPercentage() {
    let result = (counter * 100) / total
    result = result.toFixed(2)
    return {
      percenteage: result,
      numberOf: counter
    }
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-5 col-md-8 col-12'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <span className='col p-0'>آپلود جمعی اطلاعات</span>
            <CloseIcon onClick={() => props.handleState('upload', false)} />
          </div>
          <div className='main-upload-info'>
            <div className='upload-info-item'>
              <div className='upload-info-item-label'>
                <label>دانلود قالب نمونه</label>
              </div>
              <div className='row mr-0 ml-0 mt-3'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-12 pr-1 pl-1'>
                  <a
                    href='#'
                    className='btn-upload-info template'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <GetAppRoundedIcon />
                    دانلود قالب اکسل
                  </a>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-12 pr-1 pl-1'>
                  <a
                    href='#'
                    className='btn-upload-info sample'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <GetAppRoundedIcon />
                    دانلود اکسل نمونه
                  </a>
                </div>
              </div>
            </div>
            <div className='upload-info-item'>
              <div className='upload-info-item-label'>
                <label>آپلود اطلاعات</label>
              </div>
              <div className='row mr-0 ml-0 mt-3'>
                <div className='col-12 pr-1 pl-1 mb-1'>
                  <input
                    className='d-none'
                    type='file'
                    id='excel'
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    onChange={e =>
                      props.handleUpload
                        ? props.handleUpload(e, 'excelFile', 'excelFileName')
                        : handleImport(e)
                    }
                  />
                  <label
                    htmlFor={upload ? '' : `excel`}
                    className={`btn-upload-info excel ${upload ? 'ltr' : ''}`}
                  >
                    {upload ? (
                      <React.Fragment>
                        <span className='show-percentage'>
                          {`${ShowPercentage().numberOf} / ${total}`}
                        </span>
                        <span
                          className='width-loaded ltr'
                          style={{ width: `${ShowPercentage().percenteage}%` }}
                        ></span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {props.state.loading === 'excelFile' ? (
                          <React.Fragment>
                            <Loading className='form-loader' />
                            در حال بارگذاری فایل
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <PublishRoundedIcon />
                            آپلود فایل اکسل
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </label>
                </div>
                <div className='col-12 pr-1 pl-1 mt-1'>
                  <input
                    className='d-none'
                    type='file'
                    id='attachment'
                    accept='*'
                    onChange={e =>
                      props.handleUpload
                        ? props.handleUpload(
                          e,
                          'attachmentFile',
                          'attachmentFileName'
                        )
                        : ''
                    }
                  />
                  <label
                    htmlFor='attachment'
                    className='btn-upload-info attachment'
                  >
                    <PublishRoundedIcon />
                    آپلود مدارک پیوست
                  </label>
                </div>
              </div>
              <div className='col-12 pr-1 pl-1 mt-1'>
                <div className='upload-info-item-note'>
                  <p className='m-0'>
                    در صورتی که فایل اکسل شما با فایل قالب مطابقت نداشته باشد با
                    خطا مواجه خواهید شد
                  </p>
                </div>
              </div>
            </div>
            <div className='submit-upload mt-4 row mr-0 ml-0'>
              <div className='col-xl-9 col-lg-8 col-md-8 col-7 pr-0 pl-1'>
                <button
                  className='accept cursor'
                  onClick={() =>
                    props.submitUpload ? props.submitUpload('excelFile') : ''
                  }
                  disabled={props.state.disabled}
                >
                  {props.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon className='ml-1' />
                  )}
                  ثبت اطلاعات
                </button>
              </div>
              <div className='col-xl-3 col-lg-4 col-md-4 col-5 pr-1 pl-0'>
                <button
                  className='closeButton cursor'
                  onClick={() => props.handleState('upload', false)}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UploadInformation
