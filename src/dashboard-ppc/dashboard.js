import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import LastSituationBox from './LastSituationBox'
// import DivergentStackedBars from './DivergentStackedBars'
// import React, { Component } from 'react'
import DataGrouping50KPoints from './DataGrouping50KPoints'
import PieOfPie from './PieOfPie'
import CylinderGauge from './CylinderGauge'
// import StackedColumnChart from './StackedColumnChart'
import StackedColumnChart100 from './StackedColumnChart100'
import ClusteredBarChart from './ClusteredBarChart'
import ShowChartIcon from '@material-ui/icons/ShowChart'
export default class DashbordPPC extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listLastSituation: {
        volume: [
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
        cost: [
          {
            title: 'آخرین وضعیت هزینه کرد خوراک',
            first: {
              program: '10',
              real: '75',
              deviation: '15'
            },
            second: {
              program: '20',
              real: '46',
              deviation: '34'
            }
          },
          {
            title: 'آخرین وضعیت درآمد محصول',
            daramad: true,
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
            title: 'آخرین وضعیت هزینه کرد فلر',
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
            title: 'آخرین وضعیت هزینه کرد سرویس‌های جانبی',
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
        ]
      },
      check2: false,
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
        ],
        productRatio: [
          {
            country: 'پنتان پلاس',
            litres: 100,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'پروپان',
            litres: 500,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'بوتان',
            litres: 400,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'اتان',
            litres: 300,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'متان',
            litres: 120,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          }
        ],
        productFellerRatio: [
          {
            country: 'محصول',
            litres: 100,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          },
          {
            country: 'فلر(پرتی)',
            litres: 100,
            subData: [
              { name: 'واقعی', value: 200 },
              { name: 'انحراف', value: 150 }
            ]
          }
        ]
      },
      clusteredBarChart: {
        income: [
          {
            year: '(گاز ترش (خوراک',
            actual: 23,
            plan: 18,
            deviation: 5
          },
          {
            year: '(گاز شیرین (خوراک',
            actual: 26,
            plan: 22,
            deviation: 4
          },
          {
            year: '(میعانات گازی (خوراک',
            actual: 30,
            plan: 23,
            deviation: 7
          },
          {
            year: '(پنتان پلاس (محصول',
            actual: 16,
            plan: 29,
            deviation: -13
          },
          {
            year: '(پروپان (محصول',
            actual: 24,
            plan: 32,
            deviation: -8
          },
          {
            year: '(بوتان (محصول',
            actual: 30,
            plan: 23,
            deviation: 7
          },
          {
            year: '(اتان (محصول',
            actual: 30,
            plan: 23,
            deviation: 7
          },
          {
            year: '(متان (محصول',
            actual: 19,
            plan: 26,
            deviation: -7
          },
          {
            year: 'سرویس‌های جانبی',
            actual: 25,
            plan: 23,
            deviation: 2
          }
        ],
        expense: [
          {
            year: '(گاز ترش (خوراک',
            actual: 23,
            plan: 18,
            deviation: -5
          },
          {
            year: '(گاز شیرین (خوراک',
            actual: 26,
            plan: 22,
            deviation: -4
          },
          {
            year: '(میعانات گازی (خوراک',
            actual: 30,
            plan: 23,
            deviation: -7
          },
          {
            year: '(پنتان پلاس (محصول',
            actual: 16,
            plan: 29,
            deviation: 13
          },
          {
            year: '(پروپان (محصول',
            actual: 24,
            plan: 32,
            deviation: 8
          },
          {
            year: '(بوتان (محصول',
            actual: 30,
            plan: 23,
            deviation: -7
          },
          {
            year: '(اتان (محصول',
            actual: 30,
            plan: 23,
            deviation: -7
          },
          {
            year: '(متان (محصول',
            actual: 19,
            plan: 26,
            deviation: 7
          },
          {
            year: 'سرویس‌های جانبی',
            actual: 25,
            plan: 23,
            deviation: -2
          }
        ]
      }
    }
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
              <Menu nameRole='' nameUrl={this.props.nameUrl} />
              <div className='w-100 main-box-dashboard'>
                <div className='main-SituationBox row mr-0 ml-0'>
                  {this.state.listLastSituation.volume &&
                    this.state.listLastSituation.volume.map((data, key) => (
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
                        آخرین وضعیت حجم روزانه خوراک و محصول
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='row mr-0 ml-0'>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                        <StackedColumnChart100 id='chartdiv' />
                      </div>
                      {/* <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                                <StackedColumnChart100
                                                    id='chartdiv2'
                                                />
                                            </div> */}
                    </div>
                  </div>
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        آخرین وضعیت تجمعی حجم خوراک - محصول
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='col-12'>
                      <div className='sub-title text-right rtl'>
                        <h5>وضعیت تجمعی خوراک</h5>
                      </div>
                      <DataGrouping50KPoints id='chartdiv2' />
                    </div>
                    <div className='col-12'>
                      <div className='sub-title text-right rtl'>
                        <h5>وضعیت تجمعی محصول</h5>
                      </div>
                      <DataGrouping50KPoints id='chartdiv3' />
                    </div>
                  </div>
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        نمودار حجم خوراک روزانه
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='col-12'>
                      <CylinderGauge id='chartdiv8' />
                    </div>
                  </div>
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        گزارشات مقایسه‌ای خوراک و محصول
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='row mr-0 ml-0'>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div className='sub-title text-right rtl'>
                          <h5>NGL خوراک</h5>
                        </div>
                        <PieOfPie id='chartdiv4' {...this} name='NGL' />
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div className='sub-title text-right rtl'>
                          <h5>نسبت خوراک‌ها</h5>
                        </div>
                        <PieOfPie id='chartdiv5' {...this} name='feedRatio' />
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div className='sub-title text-right rtl'>
                          <h5>نسبت محصولات</h5>
                        </div>
                        <PieOfPie
                          id='chartdiv6'
                          {...this}
                          name='productRatio'
                        />
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                        <div className='sub-title text-right rtl'>
                          <h5>نسبت محصول به فلر</h5>
                        </div>
                        <PieOfPie
                          id='chartdiv7'
                          {...this}
                          name='productFellerRatio'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className='col-12 pr-1 pl-1 mt-4'>
                                    <div className='main-charts ltr'>
                                        <div className='title rtl'>
                                            <h4>
                                                <ShowChartIcon />
                                                حجم تولید (محصول) بر اساس برنامه-واقعی
                                            </h4>
                                            <a href='#'>جزئیات بیشتر</a>
                                        </div>
                                        <div className='col-12'>
                                            <StackedColumnChart
                                                id='chartdiv9'
                                            />
                                        </div>
                                    </div>
                                </div> */}
                <div className='main-SituationBox row mt-4 mr-0 ml-0'>
                  {this.state.listLastSituation.cost &&
                    this.state.listLastSituation.cost.map((data, key) => (
                      <LastSituationBox
                        {...this}
                        data={data}
                        key={key}
                        _key={key}
                        label='هزینه'
                        name='const'
                        unit='تومان'
                      />
                    ))}
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        آخرین وضعیت هزینه‌ها روزانه
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='col-12'>
                      <ClusteredBarChart
                        id='chartdiv10'
                        name='expense'
                        {...this}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        آخرین وضعیت درآمدها روزانه
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='col-12'>
                      <ClusteredBarChart
                        id='chartdiv11'
                        name='income'
                        {...this}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12 pr-1 pl-1 mt-4'>
                  <div className='main-charts ltr'>
                    <div className='title rtl'>
                      <h4>
                        <ShowChartIcon />
                        آخرین وضعیت تجمعی هزینه‌ها و درآمدها
                      </h4>
                      <a href='#/'>جزئیات بیشتر</a>
                    </div>
                    <div className='col-12'>
                      <div className='sub-title text-right rtl'>
                        <h5>وضعیت تجمعی هزینه‌ها</h5>
                      </div>
                      <DataGrouping50KPoints id='chartdiv12' />
                    </div>
                    <div className='col-12'>
                      <div className='sub-title text-right rtl'>
                        <h5>وضعیت تجمعی درآمدها</h5>
                      </div>
                      <DataGrouping50KPoints id='chartdiv13' />
                    </div>
                  </div>
                </div>
                {/* <div className='col-12 pr-1 pl-1 mt-4'>
                                    <div className='main-charts ltr'>
                                        <div className='title rtl'>
                                            <h4>
                                                <ShowChartIcon />
                                                گزارشات هزینه‌ای براساس برنامه-واقعی
                                            </h4>
                                            <a href='#'>جزئیات بیشتر</a>
                                        </div>
                                        <div className='row mr-0 ml-0'>
                                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                                <DivergentStackedBars
                                                    id='chartdiv11'
                                                />
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                                <DivergentStackedBars
                                                    id='chartdiv12'
                                                />
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                                <DivergentStackedBars
                                                    id='chartdiv13'
                                                />
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                                <DivergentStackedBars
                                                    id='chartdiv14'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
