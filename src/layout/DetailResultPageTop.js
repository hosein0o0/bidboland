import React, { useState, useEffect } from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import PopUpGallery from '../gallery/PopUpGallery'
function DetailResultPageTop (props) {
  useEffect(() => {
    const info = props.state.information
    if (info) {
      setListInfo([
        {
          label: 'Equipment NO',
          value: info.equipment_no
        },
        {
          label: 'Sub System Name',
          value: info.sub_system_name
        },
        {
          label: 'Task Type Name',
          value: info.task_type_name
        },
        // {
        //     label: 'MR No',
        //     value: '-',
        // },
        // {
        //     label: 'MR Description',
        //     value: '-',
        // },
        // {
        //     label: 'Vendor Name',
        //     value: '-',
        // },
        {
          label: 'Description',
          value: info.description
        },
        {
          label: 'Discipline',
          value: info.disc
        },
        {
          label: 'Zone',
          value: info.zone
        },
        {
          label: 'Unit',
          value: info.unit
        },
        {
          label: 'System Name',
          value: info.system_name
        }
      ])
    }
  }, [props])
  const [popUp, setPopUp] = useState(false)
  const [detail, setDetail] = useState(false)
  const [ListInfo, setListInfo] = useState([])
  function SelectGallery (data) {
    setDetail(data)
    setPopUp(true)
  }
  function Covertor (obj) {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  function ClosePopUp (status) {
    setPopUp(status)
    setDetail('')
  }
  return (
    <div className='detail-result-page-top row mr-0 ml-0 ltr'>
      <div className='col-12'>
        <h4 className='detail-result-title strong'>Information</h4>
      </div>
      <div className='col-xl-8 cl-lg-8 col-12 row mr-0 ml-0 detail-result-page-top-value p-0'>
        {ListInfo.map((data, key) => (
          <div
            className='col-xl-6 col-lg-6 col-md-12 col-12 mt-1 mb-1'
            key={key}
          >
            <div className='detail-result-item'>
              <label className='mb-0 mr-1'>{data.label}:</label>
              <span className='strong'>{data.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='col-xl-4 cl-lg-4 col-12 main-gallery-result rtl row mr-0 ml-0 p-0'>
        {props.state.gallery_result.map(
          (data, key) =>
            key <= 4 && (
              <div className='col-xl-4 col-lg-4 col-md-6 col-6 p-1' key={key}>
                <div
                  className='box-gallery-result pointer'
                  onClick={() => SelectGallery(data)}
                >
                  <img
                    className='box-gallery-result-img'
                    src={data.pictures['0']}
                    alt=''
                  />
                  <div className='fullscreen'>
                    <FullscreenIcon />
                  </div>
                </div>
              </div>
            )
        )}
        {props.state.gallery_result.length > 5 && (
          <div className='col-xl-4 col-lg-4 col-md-6 col-6 p-1'>
            <div className='box-gallery-result pointer more'>
              <div className='w-100 text-center'>
                <PhotoLibraryIcon />
                <span className='d-block'>تصاویر بیشتر</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-100 h-100 rtl'>
        {popUp && (
          <PopUpGallery
            close={status => ClosePopUp(status)}
            detail={detail}
            Covertor={Covertor}
            fetchData={props.loadData}
            role={props.state.role}
          />
        )}
      </div>
    </div>
  )
}
export default DetailResultPageTop
