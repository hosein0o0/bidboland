import React, { Component } from 'react'
import './print.css'
import Form_1 from './Form_1'
import Form_2 from './Form_2'
import Form_3 from './Form_3'
import Form_4 from './Form_4'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import NotificationContainer from '../../notification/NotificationCotainer'
import logo from './img/bigi.jpg'
import moment from 'moment-jalaali'
import handleCheckText from '../../handleCheckText'
export default class PrintARP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      reasonsAccident: [
        [
          {
            value: 'کار بر روی تجهیز بدون قطع منبع انرژی',
            label: 'کار بر روی تجهیز بدون قطع منبع انرژی'
          },
          {
            value: 'عدم کارایی سیستم‌های ایمنی تجهیزات',
            label: 'عدم کارایی سیستم‌های ایمنی تجهیزات'
          },
          {
            value: 'عدم رعایت الزامات در دستورالعمل‌های بهره‌برداری',
            label: 'عدم رعایت الزامات در دستورالعمل‌های بهره‌برداری'
          }
        ],
        [
          {
            value: 'نقص در نحوه نگارش پروانه‌های کار',
            label: 'نقص در نحوه نگارش پروانه‌های کار'
          },
          {
            value: 'فقدان یا نامناسب بودن وسایل حفاظت فردی',
            label: 'فقدان یا نامناسب بودن وسایل حفاظت فردی'
          },
          {
            value: 'فقدان دستورالعمل کاری مناسب',
            label: 'فقدان دستورالعمل کاری مناسب'
          }
        ],
        [
          {
            value: 'راه اندازی تجهیز به شکل ناایمن',
            label: 'راه اندازی تجهیز به شکل ناایمن'
          },
          {
            value: 'عدم ایزوله کردن درست تجهیز',
            label: 'عدم ایزوله کردن درست تجهیز'
          },
          {
            value: 'عدم اجرای روش جاری در مدیریت تغییر',
            label: 'عدم اجرای روش جاری در مدیریت تغییر'
          }
        ],
        [
          {
            value: 'نقص در نحوه اجرای پروانه‌های کار',
            label: 'نقص در نحوه اجرای پروانه‌های کار'
          },
          { value: 'نقص در ارتباطات پروسسی', label: 'نقص در ارتباطات پروسسی' },
          { value: 'عدم اجرای مدیریت ریسک', label: 'عدم اجرای مدیریت ریسک' }
        ],
        [
          {
            value: 'کار برروی تجهیز بدون مجوز',
            label: 'کار برروی تجهیز بدون مجوز'
          },
          {
            value: 'استفاده نادرست و غیراصولی از تجهیزات(آموزش ناکافی)',
            label: 'استفاده نادرست و غیراصولی از تجهیزات(آموزش ناکافی)'
          },
          {
            value: 'فقدان یا ضعف برنامه تعمیر و نگهداری پیشگیرانه و بازرسی',
            label: 'فقدان یا ضعف برنامه تعمیر و نگهداری پیشگیرانه و بازرسی'
          }
        ],
        [
          { value: 'نقشه‌های نامناسب', label: 'نقشه‌های نامناسب' },
          {
            value: 'نقص در طراحی (شناسایی پیش از حادثه)',
            label: 'نقص در طراحی (شناسایی پیش از حادثه)'
          },
          {
            value: 'نقص در طراحی (عدم شناسایی پیش از حادثه)',
            label: 'نقص در طراحی (عدم شناسایی پیش از حادثه)'
          }
        ]
      ],
      level: 0
    }
  }
  componentDidMount () {
    this.fetchData()
  }
  CheckPyvast = data => {
    const check =
      data.arp1_has_log_sheets === '1' || data.arp1_has_trend_attachment === '1'
    return check ? 'دارد' : 'ندارد'
  }
  fetchData = async () => {
    let url = window.location.href
    let array = url.split('/')
    if (url) {
      const id = array[array.length - 1]
      if (id) {
        const address = `${StaticData.domainIp}/arp/get/${id}`
        await axios
          .get(address, {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          })
          .then(async response => {
            if (response.status === 200) {
              const content = response.data.content
                ? response.data.content[0]
                : {}
              let select =
                parseInt(content.form) === 34 ? 4 : parseInt(content.form)
              content['level'] = select
              content['number'] = id
              // data['peyvast'] = this.CheckPyvast(data)
              this.setState(content)
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
    if (date) {
      let hour = date.split(' ')[1]
      let arrayHour = hour.split(':')
      const resulthout = arrayHour ? ` ${arrayHour[0]}:${arrayHour[1]} ` : ''
      const currentDate = resulthout + moment(date).format(' jYYYY/jMM/jDD ')

      return currentDate
    }
    return '-'
  }
  handleCheckCorrective = () => {
    const { corrective_actions } = this.state
    let i = 0
    let check = false
    if (corrective_actions) {
      while (i < corrective_actions.length) {
        check =
          handleCheckText(corrective_actions[i].status) &&
          corrective_actions[i].responsible.length > 0
        // &&
        // handleCheckText(_corrective_actions[i].responsible)
        if (!check) {
          break
        }
        i++
      }
    }
    return check
  }
  render () {
    const { level, event_description, event_before_instructions } = this.state
    return (
      <div className='mainPDF'>
        <NotificationContainer />
        {level > 0 ? <Form_1 {...this} logo={logo} checkAuthor={true} /> : ''}
        {level > 1 ? <Form_2 {...this} logo={logo} /> : ''}
        {level > 2 ? (
          <Form_3
            {...this}
            logo={logo}
            checkAuthor={
              handleCheckText(event_description) ||
              handleCheckText(event_before_instructions)
            }
          />
        ) : (
          ''
        )}
        {level > 3 ? (
          <Form_4
            {...this}
            logo={logo}
            checkAuthor={this.handleCheckCorrective()}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}
