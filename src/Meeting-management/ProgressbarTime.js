import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import moment from 'moment-jalaali'
import Cookies from 'js-cookie'
export default class ProgressbarTime extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countDown: '00:00:00',
      time: '',
      max: 0,
      min: 0,
      Consumed: 0,
      endTime: '',
      expiration: false,
      Percentage: 0
    }
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      let now = moment().format('HH:mm:ss')
      if (this.props.id !== '' && this.props.sum > 0) {
        let time = Cookies.get(`__${this.props.id}`)
        if (!time) {
          Cookies.set(`__${this.props.id}`, now)
          time = moment().format('HH:mm:ss')
        }
        let d = await moment
          .duration(time)
          .add(moment.duration(this.props.sum, 'minutes'))
        await this.setState({
          endTime: moment.utc(d.as('milliseconds')).format('HH:mm:ss'),
          max: moment.duration(this.props.sum, 'minutes')._milliseconds
        })
        let beginningTime = moment(now, 'h:mm:ss')
        let endTime = moment(this.state.endTime, 'h:mm:ss')
        if (beginningTime.isBefore(endTime)) {
          await this.startTimer()
        } else {
          this.endTimer()
        }
      }
    }
  }
  endTimer = () => {
    this.setState({ expiration: true })
    Cookies.remove(`__${this.props.id}`)
  }
  startTimer = () => {
    let duration = moment.duration(this.state.endTime, 'HH:mm:ss')
    let interval = 1000
    let MyTime = setInterval(() => {
      duration = moment.duration(
        duration.asMilliseconds() - interval,
        'milliseconds'
      )
      let now = moment().format('HH:mm:ss')
      let first = moment.duration(now)
      let end = moment.duration(this.state.endTime)
      let b = end.subtract(first)
      this.setState({
        countDown: moment.utc(b.as('milliseconds')).format('HH:mm:ss'),
        Consumed: b._milliseconds,
        Percentage: parseFloat(
          ((b._milliseconds * 100) / this.state.max).toFixed(2)
        )
      })
      if (this.state.countDown === '00:00:00' || now === this.state.endTime) {
        this.setState({ expiration: true })
        clearInterval(MyTime)
        // Cookies.remove(`__${this.props.id}`)
      }
    }, interval)
  }
  handleColor = () => {
    if (this.state.Percentage >= 50) {
      return {
        path: 'rgb(27 167 85)',
        trail: 'rgb(27 167 85 / 26%)'
      }
    } else if (this.state.Percentage < 50 && this.state.Percentage >= 25) {
      return {
        path: 'rgb(249 230 10)',
        trail: 'rgb(249 230 10 / 26%)'
      }
    } else if (this.state.Percentage < 25) {
      return {
        path: 'rgb(245 61 73)',
        trail: 'rgb(245 61 73 / 26%)'
      }
    }
  }
  render () {
    return (
      <div className='progressbar'>
        <CircularProgressbar
          value={this.state.Consumed}
          text={this.state.countDown}
          minValue={0}
          maxValue={this.state.max}
          styles={{
            path: {
              stroke: this.handleColor() ? this.handleColor().path : '',
              strokeLinecap: 'butt',
              transition: 'stroke-dashoffset 1s ease 0s',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center'
            },
            trail: {
              stroke: this.handleColor() ? this.handleColor().trail : '',
              strokeLinecap: 'butt',
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center'
            },
            text: {
              fill: '#161616',
              fontSize: '1em'
            },
            background: {
              fill: '#fff'
            }
          }}
        />
        <div className='textProgress'>
          <span>
            {this.state.expiration
              ? 'جلسه به پایان رسید'
              : 'زمان باقی مانده جلسه'}
          </span>
        </div>
      </div>
    )
  }
}
