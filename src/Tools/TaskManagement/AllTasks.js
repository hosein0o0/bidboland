import React, { Component } from 'react'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
export default class AllTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {
          title: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          paragraph:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد',
          add: true,
          attach: true,
          forward: true,
          time: 'تا یک هقته آینده',
          status: 'default'
        },
        {
          title: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          paragraph:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد',
          add: false,
          attach: true,
          forward: true,
          time: 'تا یک هقته آینده',
          status: 'default'
        },
        {
          title: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          paragraph:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد',
          add: true,
          attach: false,
          forward: true,
          time: 'تا یک هقته آینده',
          status: 'default'
        },
        {
          title: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          paragraph:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد',
          add: true,
          attach: true,
          forward: false,
          time: 'تا یک هقته آینده',
          status: 'default'
        },
        {
          title: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          paragraph:
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد',
          add: false,
          attach: false,
          forward: false,
          time: 'تا یک هقته آینده',
          status: 'default'
        }
      ]
    }
  }
  render () {
    const { list } = this.state
    return list.map((data, key) => (
      <div className='col-12 pt-1' key={key}>
        <div className='row mx-0 item-task'>
          <div className='checkbox'>
            <input
              type='checkbox'
              className='d-none'
              id={`allTask${key}`}
              onChange={e =>
                this.setState({ [`allTask${key}`]: e.target.checked })
              }
            />
            <label htmlFor={`allTask${key}`}>
              {this.state[`allTask${key}`] ? (
                <CheckBoxIcon className='active' />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}
            </label>
          </div>
          <div className='col-10'>
            <div className='main-title mb-2'>
              <h2 className='title IranSans_Bold_FA mb-0'>{data.title}</h2>
              <span className={`status ${data.status}`}>
                <CalendarTodayIcon className='ml-1' />
                {data.time}
              </span>
            </div>
            <div className='main-paragraph'>
              <p className='paragraph'>{data.paragraph}</p>
            </div>
          </div>
          <div className='col pr-0 pl-0'>
            <div className='handleIcon d-flex'>
              {data.attach ? (
                <React.Fragment>
                  <input type='file' className='d-none' id={`attach${key}`} />
                  <label
                    className='pointer mb-0 mx-auto'
                    htmlFor={`attach${key}`}
                  >
                    <AttachFileIcon />
                  </label>
                </React.Fragment>
              ) : (
                ''
              )}
              {data.add ? <PersonAddIcon className='mx-auto' /> : ''}
              {data.forward ? <ArrowForwardIcon className='mx-auto' /> : ''}
            </div>
          </div>
        </div>
      </div>
    ))
  }
}
