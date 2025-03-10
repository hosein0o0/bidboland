// import AlternateEmail from '@material-ui/icons/AlternateEmail'
import React from 'react'
import StaticData from '../staticData'
// import ListNameTsr from './ListNameTsr'
import CurrentString from '../handleString'
import CheckPersianText from '../CheckPersianText'
function Row(props) {
  function handleShow(name, index) {
    if (props.header[index].img) {
      return (
        <a className='imgDownload' key={index} href={props.data[name]}>
          <img src={props.data[name]} alt='' />
        </a>
      )
    } else if (props.header[index].hasSecondValue) {
      return (
        props.data[name] &&
        handlecheck(props.data[name][props.header[index].secondValue])
      )
    } else if (props.link && props.link.includes(name)) {
      return props.handleAttachment(props.data[name]).length === 0 ? (
        <span>ندارد</span>
      ) : (
        props.handleAttachment(props.data[name]).map((dataImage, index1) => (
          <a key={index1} href={dataImage} target='_blank' rel='noreferrer'>
            <span className='showAttach'>{`نامه ${index1 + 1}`}</span>
          </a>
        ))
      )
    } else if (props.status && props.status.includes(name)) {
      return props.handleStatus(props.data[name]) ? (
        <img
          className={
            props.data[`${props.textStatus}`] !== null &&
              props.data[`${props.textStatus}`] !== ''
              ? 'cursor'
              : ''
          }
          onClick={() =>
            props.data[`${props.textStatus}`] !== null &&
              props.data[`${props.textStatus}`] !== ''
              ? props.statusSetState({
                textAfc: props.data[`${props.textStatus}`],
                popUp: true,
                popUpDisabled: true
              })
              : ''
          }
          src={props.handleStatus(props.data[name])}
          alt=''
        />
      ) : (
        'ندارد'
      )
    } else if (
      name === 'issueby' ||
      name === 'author' ||
      name === 'approveBy' ||
      name === 'secretary_committee'
    ) {
      if (props.data[name].first_name && props.data[name].last_name) {
        return `${props.data[name].first_name} ${props.data[name].last_name}`
      } else if (typeof props.data[name] === 'string') {
        return props.data[name] ? props.data[name] : ''
      } else return '-'
    } else if (props.header[index].copyOf) {
      let data = props.data[props.header[index].copyOf]
      if (data) {
        data = data.split(
          props.header[index].delimiter ? props.header[index].delimiter : '-'
        )
        data =
          data[
          props.header[index].selectPlace
            ? props.header[index].selectPlace
            : 0
          ]
        return data
      } else return '-'
    } else if (props.data[name]) {
      return handlecheck(props.data[name])
    } else return '-'
  }
  function handlecheck(name) {
    if (name) {
      name = name.toString()
      if (
        props.data.verified === '0' &&
        (name === 'create' || name === 'sign' || name === 'update')
      ) {
        return 'بسته شده'
      } else if (name === 'no') {
        return 'ندارد'
      } else if (name === 'yes') {
        return 'دارد'
      } else if (name === 'in') {
        return 'وارده'
      } else if (name === 'out') {
        return 'صادره'
      } else if (name === 'create') {
        return 'ساخت'
      } else if (name === 'sign') {
        return 'امضا'
      } else if (name === 'update') {
        return 'ویرایش'
      } else if (name === 'close') {
        return 'بسته شده'
      } else if (name === 'complete') {
        return 'به اتمام رسیده'
      } else {
        return name
      }
    } else return '-'
  }
  function handleString(str, index) {
    if (props.header[index].img) {
      return str
    } else {
      return CurrentString(String(str))
    }
  }
  function handleHref(index) {
    if (props.IndependentLink) {
      if (props.IndependentLink === 'empty') {
        return '#'
      } else {
        return props.IndependentLink
      }
    } else {
      if (props._linkDownload) {
        return `${StaticData.domainIp}/${props._linkDownload}/${handleShow(
          'id',
          index
        )}`
      } else {
        return `${StaticData.domainIp}/transmittal/getZipArcive/${handleShow(
          'id',
          index
        )}`
      }
    }
  }
  function CheckNull(data) {
    if (
      !(
        data === 'null' ||
        data === null ||
        data === undefined ||
        data === 'undefined'
      )
    ) {
      return data
    } else return '-'
  }
  function CheckListDownload(row, index) {
    const { hasSplit, delimiter } = props.header[index]
    return (
      <td
        className={handleClassName(row, index)}
        onClick={() => !props.objLink[row] && handleHighlight()}
        key={index}
      >
        {props.objLink[row] ? (
          hasSplit ? (
            handleMultiLink(delimiter, row, index)
          ) : (
            <a
              className='_download'
              href={props.objLink[row] ? props.objLink[row] : '#/'}
              target='_blank'
              rel='noreferrer'
              key={index}
            >
              {handleString(handleShow(row, index), index)}
            </a>
          )
        ) : (
          handleString(handleShow(row, index), index)
        )}
      </td>
    )
  }
  function mergeName(item, index) {
    // let array = item.Name || []
    let name = item.Name || item
    return handleString(name, index)
  }
  function MergeeUrl(item, row, _key) {
    let url = item.Link || props.objLink[row][_key]
    return url
  }
  function handleMultiLink(delimiter, row, index) {
    let value = handleString(handleShow(row, index), index)
    let array = props.objLink[row] || value.split(delimiter || '&') || []
    let _list = []
    array.forEach((item, _key) => {
      const _Url = MergeeUrl(item, row, _key)
      _list.push(
        <React.Fragment>
          {_Url ? (
            <a
              className='_download multiLink'
              href={_Url ? _Url : '#/'}
              target='_blank'
              rel='noreferrer'
              key={index}
            >
              {mergeName(item, index)}
            </a>
          ) : (
            mergeName(item, index)
          )}
          {array.length > 0 && _key !== array.length - 1 ? ` - ` : ''}
        </React.Fragment>
      )
    })
    return _list
  }
  function handleClassName(row, index) {
    let objFiltered = props.objFiltered ? props.objFiltered : {}
    let list = objFiltered[row] ? objFiltered[row] : []
    let _obj = props.header[index] || {}
    const _checkFiltered = list.length > 0
    const checkAttach = props.link && props.link.includes(row) ? 'attach' : ''
    const checkFilter = props.handleFilter ? props.handleFilter(_obj.name) : ''
    const checkStatus = props.status ? 'status' : ''
    const _filtered = _checkFiltered ? '_filtered' : ''
    const _calssname = _obj.calssname || ''
    let _obj_data = props.data || {}
    let value = CurrentString(_obj_data[row])
    const rtl_ltr = CheckPersianText(value) ? 'rtl' : 'ltr'
    const parent = CurrentString(_obj.class_name_parent)
    const parentFn = _obj.class_name_parentFn ? _obj.class_name_parentFn({ data: props.data, checkClick: _obj.checkClick }) : ''
    let result_className = `${checkAttach} ${checkFilter} ${checkStatus} ${_filtered} ${_calssname} ${rtl_ltr} ${parent} ${parentFn}`
    return result_className.trim()
  }
  function handleHighlight(index) {
    const { handleState, _active, _index, header, data } = props
    if (handleState) {
      handleState(
        '_active',
        _active === _index ? '' : _index
      )
    }
    let _obj = header[index] || {}
    const { clickable, checkClick, valueClick, nameState } = _obj
    if (clickable) {
      if (data[checkClick]) {
        handleState(nameState, data[valueClick])
      }
    }
  }
  return (
    <React.Fragment>
      {props.row.map((row, index) =>
        props.header[index].download && props.permision ? (
          CheckListDownload(row, index)
        ) : props.download && props.download === props.header[index].name ? (
          <td className={handleClassName(row, index)} key={index}>
            <a
              className='_download'
              href={handleHref(index)}
              target='_blank'
              rel='noreferrer'
              key={index}
            >
              {handleString(handleShow(row, index), index)}
            </a>
          </td>
        ) : (
          <td
            className={handleClassName(row, index)}
            onClick={() => handleHighlight(index)}
            key={index}
          >
            {props.header[index].changeColor}
            {(props.NotcheckString && props.NotcheckString.includes(row)) ||
              (props.link && props.link.includes(row))
              ? CheckNull(handleShow(row, index))
              : CheckNull(handleString(handleShow(row, index), index))}
          </td>
        )
      )}
    </React.Fragment>
  )
}
export default Row
