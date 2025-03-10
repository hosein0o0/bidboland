import React, { Component } from 'react'
import './tsr_print.css'
import NotificationContainer from '../../notification/NotificationCotainer'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'
import Page5 from './page5'
import Page6 from './page6'
import Page7 from './page7'
import Page8 from './page8'
import Page9 from './page9'
import Page10 from './page10'
import Page11 from './page11'
import Page12 from './page12'
import moment from 'moment-jalaali'
import handleCheckText from '../../handleCheckText'
import ListSign from '../../TSR/ListSign'
export default class FormTSR extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      improvement_type: [
        [
          {
            value: 'تامین الزامات ایمنی تجهیزات و نیروی انسانی',
            label: 'تامین الزامات ایمنی تجهیزات و نیروی انسانی'
          },
          {
            value: 'رفع موانع جهت دستیابی به ظرفیت اسمی',
            label: 'رفع موانع جهت دستیابی به ظرفیت اسمی'
          },
          {
            value: 'جلوگیری از تولید محصول نامنطبق',
            label: 'جلوگیری از تولید محصول نامنطبق'
          }
        ],
        [
          {
            value: 'بهبود در راندمان فرایندهای تولیدی',
            label: 'بهبود در راندمان فرایندهای تولیدی'
          },
          {
            value: 'رفع موانع جهت دستیابی به ظرفیت برنامه ای',
            label: 'رفع موانع جهت دستیابی به ظرفیت برنامه ای'
          },
          {
            value: 'افزایش راندمان مصرف انرژی',
            label: 'افزایش راندمان مصرف انرژی'
          }
        ],
        [
          {
            value: 'جلوگیری از خرابی مکرر تجهیزات عملیاتی',
            label: 'جلوگیری از خرابی مکرر تجهیزات عملیاتی'
          },
          {
            value: 'بهبود در عملیات بهره برداری و تعمیرات',
            label: 'بهبود در عملیات بهره برداری و تعمیرات'
          },
          {
            value: 'کاهش و یا حذف عوامل زیان آور زیست محیطی',
            label: 'کاهش و یا حذف عوامل زیان آور زیست محیطی'
          }
        ],
        [
          {
            value: 'افزایش ظرفیت اسمی تولید',
            label: 'افزایش ظرفیت اسمی تولید'
          },
          {
            value: 'بهبود شرایط سلامت، محیط کار و ارگونومی',
            label: 'بهبود شرایط سلامت، محیط کار و ارگونومی'
          },
          {
            value: 'تولید گریدهای جدید',
            label: 'تولید گریدهای جدید'
          }
        ],
        [
          {
            value: 'بهبود در پایش سرویس های مبادلاتی',
            label: 'بهبود در پایش سرویس های مبادلاتی'
          },
          {
            value: 'درخواست های خدماتی، اداری و غیر فرایندی',
            label: 'درخواست های خدماتی، اداری و غیر فرایندی'
          },
          {
            value: 'سایر موارد',
            label: 'سایر موارد'
          }
        ]
      ],
      conditionsList: [
        {
          value:
            'درخواست‌، ماهیت تعمیراتی دارد و بایستی درخواست کار تعمیراتی صادر گردد',
          label:
            'درخواست‌، ماهیت تعمیراتی دارد و بایستی درخواست کار تعمیراتی (W.O) صادر گردد'
        },
        {
          value:
            'درخواست، اجرای اصلاحات موقتی می‌باشد که نیازی به تغییر در اسناد فنی نمی‌باشد',
          label:
            'درخواست، اجرای اصلاحات موقتی می‌باشد که نیازی به تغییر در اسناد فنی نمی‌باشد'
        },
        {
          value: 'درخواست، مربوط به خارج از محدوده تعریف شده مجتمع می‌باشد',
          label: 'درخواست، مربوط به خارج از محدوده تعریف شده مجتمع می‌باشد'
        },
        {
          value:
            'درخواست، ماهیت پروژه‌ای دارد و بایستی در قالب درخواست پروژه صادر گردد',
          label:
            'درخواست، ماهیت پروژه‌ای دارد و بایستی در قالب درخواست پروژه (PRA) صادر گردد'
        },
        {
          value:
            'درخواست، اضطراری بوده و بایستی از طریق برگزاری جلسه فنی تصمیم گیری گردد',
          label:
            'درخواست، اضطراری بوده و بایستی از طریق برگزاری جلسه فنی تصمیم گیری گردد'
        },
        {
          value:
            'درخواست، اجرای اصلاحلات موقتی است و نیازمند تغییر در اسناد فنی می‌باشد.',
          label:
            'درخواست، با حوزه تخصصی اداره متقاضی (بند 1-6 روش اجرایی) تطابق ندارد'
        },
        {
          value: 'سایر موارد',
          label: 'سایر موارد'
        }
      ]
    }
  }
  componentDidMount () {
    this.fetchData()
  }
  handnleArray = data => {
    let result = []
    const check = data === undefined
    if (!check) {
      result = Object.keys(data).map(item => {
        return data[item]
      })
    }
    return result
  }
  CoercionSign = (data, level) => {
    let list = ListSign.ListMandatory
    let i = 1
    let numResult = level
    let Not_Complete = false
    while (i <= level) {
      let tsr = list[`tsr${i}`]
      if (tsr) {
        let array = tsr.filter(_tsr => !_tsr.mandatory)
        let arraySign = Object.keys(array).map(_value => {
          return array[_value].state
        })
        const CheckFilter = arraySign.filter(
          _sign => data[`tsr${i}_${_sign}`] !== '1'
        )
        Not_Complete = CheckFilter.length > 0
        if (Not_Complete) {
          const SecondCounter = this.CheckResult(data, level)

          this.setState({
            hasNot: true,
            numResult: i === SecondCounter ? i : SecondCounter
          })
          numResult = i === SecondCounter ? i : SecondCounter
          break
        }
      }
      i++
    }
    return numResult
  }
  CheckResult = (data, level) => {
    let number = level
    let _tsr3 = {
      check: data['tsr3_review_result'] !== '0' || !data['tsr3_review_result'],
      num: 3
    }
    let _tsr4 = {
      check: data['tsr4_hse_review'] !== '0' || !data['tsr4_hse_review'],
      num: 4
    }
    let _tsr5 = {
      check: data['tsr5_review_result'] !== '0' || !data['tsr5_review_result'],
      num: 5
    }
    let _tsr6 = {
      check:
        data['tsr6_technical_review'] !== '0' || !data['tsr6_technical_review'],
      num: 6
    }
    let _tsr10 = {
      check:
        data['tsr10_review_result'] !== '0' || !data['tsr10_review_result'],
      num: 10
    }
    if (!_tsr3.check) number = _tsr3.num
    else if (!_tsr4.check) number = _tsr4.num
    else if (!_tsr5.check) number = _tsr5.num
    else if (!_tsr6.check) number = _tsr6.num
    else if (!_tsr10.check) number = _tsr10.num
    return number
  }
  fetchData = async () => {
    let url = window.location.href
    let array = url.split('/')
    if (url) {
      const id = array[array.length - 1]
      if (id) {
        const address = `${StaticData.domainIp}/tsr/get/${id}`
        await axios
          .get(address, {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          })
          .then(async response => {
            if (response.status === 200) {
              const content = response.data.content
              const status = content.status
              const data = content.data
              let select
              if (status) {
                select = parseInt(status.page.split('tsr')[1])
                // requestEdit = true
              } else {
                select = 12
                // requestEdit = false
              }
              
              data['level'] = this.CoercionSign(data, select)
              data['number'] = id
              //   data['peyvast'] = this.CheckPyvast(data)
              this.setState(data)
              
            } else {
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }
    }
  }
  handleDate = name => {
    let date = this.state[name]
    let convert
    // let hour
    if (date && date !== 'null') {
      let array = date.split(' ')
      if (array) {
        let _date = array[0]
        // hour = array[1]
        const checkDate = moment(_date, 'YYYY-MM-DD').local('fa')._isValid
        convert = checkDate
          ? moment(_date, 'YYYY-MM-DD')
              .local('fa')
              .format('jYYYY/jMM/jDD')
          : moment(_date, 'jYYYY/jMM/jDD')
              .local('fa')
              .format('jYYYY/jMM/jDD')
      }
    }
    return convert && convert !== 'Invalid date' ? ` ${convert} ` : '-'
  }
  handleChekboxSelected = (data, text) => {
    let array = text ? text.split(',') : []
    const check = array.includes(data.value)
    return check
  }
  DocumentaArray = (foreign, internal) => {
    const _foreign = foreign ? this.handleCheckEmptyForeign(foreign) : [],
      _internal = internal ? this.handleCheckEmptyInternal(internal) : []
    const merge = _foreign.concat(_internal)
    return merge
  }
  handleCheckEmptyForeign = foreign => {
    let list = Object.keys(foreign).map(value => {
      foreign[value]['Attachement'] = foreign[value]['Attachement']
        ? Object.keys(foreign[value]['Attachement']).map(att => {
            return foreign[value]['Attachement'][att]
          })
        : []
      return foreign[value]
    })
    list = list.filter(
      data =>
        handleCheckText(data.documentNumber) ||
        handleCheckText(data.degreeTitle) ||
        handleCheckText(data.numberPages) ||
        handleCheckText(data.descriptionAttachment) ||
        data.Attachement.length > 0
    )
    return list
  }
  handleCheckEmptyInternal = internal => {
    let list = Object.keys(internal).map(value => {
      return internal[value]
    })
    list = list.filter(
      data =>
        handleCheckText(data.documentNumber) ||
        handleCheckText(data.degreeTitle) ||
        handleCheckText(data.numberPages) ||
        handleCheckText(data.descriptionAttachment)
    )
    return list
  }
  DocumnentShow = data => {
    const array = []
    const { degreeTitle, Attachement, AttachementName } = data
    array.push(
      Attachement && Attachement.length > 0 ? (
        Attachement.map((link, counterLink) => (
          <a
            href={link}
            target='_blank'
            rel='noreferrer0'
            className='link-document'
          >
            {degreeTitle
              ? degreeTitle
              : AttachementName[counterLink]
              ? AttachementName[counterLink]
              : link}
          </a>
        ))
      ) : (
        <span className='value'>{degreeTitle}</span>
      )
    )
    return array
  }
  handleInstructionsOrder = () => {
    let list = [
      { name: 'مکانیک', value: 'mechanical' },
      { name: 'برق', value: 'electrical' },
      { name: 'ابزار دقیق', value: 'Instrumentation' },
      { name: 'ساختمان', value: 'building' }
    ]
    let state = this.state
    let ArrayFinal = []
    list.forEach(item => {
      let eng_instruction = state[`tsr7_${item.value}_eng_instruction`]
      eng_instruction = eng_instruction
        ? Object.keys(eng_instruction).map(__ => {
            return eng_instruction[__]
          })
        : []
      ArrayFinal.push({
        name: item.name,
        list: eng_instruction.filter(_item =>
          handleCheckText(_item.description)
        )
      })
    })
    return ArrayFinal
  }
  CheckRejectConf = () => {
    const {
      tsr1_unit_boss_verify,
      tsr1_office_boss_verify,
      tsr1_verified
    } = this.state
    const check =
      tsr1_unit_boss_verify === '1' &&
      tsr1_office_boss_verify === '1' &&
      tsr1_verified === '1'
    return check
  }
  handleConvert = name => {
    let object = this.state[name]
    let array = []
    if (object) {
      array = Object.keys(object).map(value => {
        return object[value]
      })
    }
    return array
  }
  handleClassName = str => {
    let p = /^[\u0600-\u06FF\s]+$/
    const check = str ? p.test(str) : false
    let className = check ? 'text-right' : 'text-left'
    return className
  }
  render () {
    const { level } = this.state
    return (
      <div className='mainPDF'>
        <NotificationContainer />
        <Page1 {...this} />
        {level > 1 && this.CheckRejectConf() ? <Page2 {...this} /> : ''}
        {level > 2 && this.CheckRejectConf() ? <Page3 {...this} /> : ''}
        {level > 3 && this.CheckRejectConf() ? <Page4 {...this} /> : ''}
        {level > 4 && this.CheckRejectConf() ? <Page5 {...this} /> : ''}
        {level > 5 && this.CheckRejectConf() ? <Page6 {...this} /> : ''}
        {level > 6 && this.CheckRejectConf() ? <Page7 {...this} /> : ''}
        {level > 7 && this.CheckRejectConf() ? <Page8 {...this} /> : ''}
        {level > 8 && this.CheckRejectConf() ? <Page9 {...this} /> : ''}
        {level > 9 && this.CheckRejectConf() ? <Page10 {...this} /> : ''}
        {level > 10 && this.CheckRejectConf() ? <Page11 {...this} /> : ''}
        {level > 11 && this.CheckRejectConf() ? <Page12 {...this} /> : ''}
      </div>
    )
  }
}
