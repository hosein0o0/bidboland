import React, { Component } from 'react'
import Sidebar from '../../../../layout/sidebar'
import Menu from '../../../../layout/menu'
import LastSituationBox from './LastSituationBox'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import DurationValueAxis from './DurationValueAxis'
import TableVertical from './TableVertical'
import PieOfPie from './PieOfPie'
import TableHorizontal from './TableHorizontal'
export default class DashboardDCC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _selected: 1,
      header: [
        { name: 'Row', value: 'id' },
        { name: 'Document Number', value: 'documentNumber' },
        { name: 'Activity Name', value: 'activityName' },
        { name: 'Class', value: 'class' },
        { name: 'Area Code', value: 'areaCode' },
        { name: 'Doc.Type', value: 'docType' },
        { name: 'Disc.', value: 'disc' },
        { name: 'Phase', value: 'phase' },
        { name: 'W.F', value: '' },
        { name: 'First Step Planned Date', value: 'firstStepPlannedDate' },
        { name: 'Remarks', value: 'remarks' },
        { name: 'SCOPE(N.I.O.E.C Issue)', value: 'endorsementscope' },
        { name: 'Rev.(N.I.O.E.C Issue)', value: 'endorsementRevision' },
        { name: 'Rev.', value: 'lastDocumentRevision' },
        { name: 'Transmittal No.', value: 'transmitallNumber' },
        { name: 'Verify at', value: 'verify_at' },
        { name: 'Issued Date', value: 'issuedDate' },
        { name: 'POI', value: 'poi' },
        { name: 'Last Comment', value: 'commentNumber' },
        { name: 'Comment Date', value: 'commentDate' },
        { name: 'Co. Status', value: 'commentStatus' },
        { name: 'Reply Sheet No', value: 'replyNumber' },
        { name: 'Reply Date', value: 'replyDate' },
        { name: 'Status', value: 'replyStatus' }
        // {name : "Action"},
      ],
      row: [
        {
          id: '1',
          documentNumber: 'documentNumber',
          activityName: 'activityName',
          class: 'class',
          areaCode: 'areaCode',
          docType: 'docType',
          disc: 'disc',
          phase: 'phase',
          wf: 'wf',
          firstStepPlannedDate: 'firstStepPlannedDate',
          remarks: 'remarks',
          endorsementscope: 'endorsementscope',
          endorsementRevision: 'endorsementRevision',
          lastDocumentRevision: 'lastDocumentRevision',
          transmitallNumber: 'transmitallNumber',
          verify_at: 'verify_at',
          issuedDate: 'issuedDate',
          poi: 'poi',
          commentNumber: 'commentNumber',
          commentDate: 'commentDate',
          commentStatus: 'commentStatus',
          replyNumber: 'replyNumber',
          replyDate: 'replyDate',
          replyStatus: 'replyStatus'
        }
      ],

      array: [
        {
          title: 'آخرین وضعیت حجم خوراک',
          first: {
            program: '20',
            real: '20',
            deviation: '60'
          },
          second: {
            program: '20',
            real: '46',
            deviation: '34'
          }
        },
        {
          title: 'آخرین وضعیت حجم محصول',
          first: {
            program: '29',
            real: '36',
            deviation: '35'
          },
          second: {
            program: '24',
            real: '46',
            deviation: '30'
          }
        },
        {
          title: 'آخرین وضعیت حجم فلر',
          first: {
            program: '24',
            real: '46',
            deviation: '30'
          },
          second: {
            program: '24',
            real: '46',
            deviation: '30'
          }
        },
        {
          title: 'آخرین وضعیت حجم سرویس‌های جانبی',
          first: {
            program: '24',
            real: '46',
            deviation: '30'
          },
          second: {
            program: '24',
            real: '46',
            deviation: '30'
          }
        }
      ],
      PieData: {
        NGL: [
          {
            country: 'NGL1(ترش)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'NGL2(شیرین)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'NGL3(میعانات گازی)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          }
        ],
        feedRatio: [
          {
            country: 'گاز(ترش)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'گاز(شیرین)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'گاز(میعانات گازی)',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          }
        ]
      }
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  render () {
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
              <div className='w-100 main-box-dashboard'>
                <div className='main-SituationBox row mr-0 ml-0'>
                  {this.state.array.map((data, key) => (
                    <LastSituationBox
                      {...this}
                      data={data}
                      key={key}
                      _key={key}
                      label='حجم'
                      name='volume'
                      unit='%'
                    />
                  ))}
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        لورم ایپسوم متن
                      </h4>
                      <a href='/project-engineering'>جزئیات بیشتر</a>
                    </div>
                    <div className='row mr-0 ml-0 w-100'>
                      <div className='col-xl-9 col-lg-9 col-md-12 col-12'>
                        <DurationValueAxis id={'div1'} />
                      </div>
                      <div className='col-xl-3 col-3 col-md-12 col-12'>
                        <TableVertical />
                      </div>
                      <div className='title rtl w-100'>
                        <h4>
                          <ShowChartIcon />
                          گزارشات مقایسه‌ای خوراک و محصول
                        </h4>
                        <a href='/project-engineering'>جزئیات بیشتر</a>
                      </div>
                      <div className='row mr-0 ml-0 w-100'>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-12 px-1'>
                          <div className='sub-title text-right rtl'>
                            <h5>NGL خوراک</h5>
                          </div>
                          <PieOfPie id='chartdiv4' {...this} name='NGL' />
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-12 px-1'>
                          <div className='sub-title text-right rtl'>
                            <h5>feedRatio خوراک</h5>
                          </div>
                          <PieOfPie id='chartdiv5' {...this} name='feedRatio' />
                        </div>
                      </div>
                    </div>
                    <div className='col-12 rtl'>
                      <div className='title-password w-100 my-3'>
                        <h2 className='IranSans_Bold'>لورم ایپسوم</h2>
                        <div className='line'></div>
                      </div>
                      <TableHorizontal {...this} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
