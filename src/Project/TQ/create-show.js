import React, { Component } from 'react'
import Cookies from 'js-cookie'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import TagsInput from 'react-tagsinput'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
export default class CreaterShow extends Component {
  constructor (props) {
    super(props)
    this.list = []
    this.state = {
      token: Cookies.get('token'),
      id: '',
      contractNumber: '',
      refrenceNumber: '',
      mapNo: '',
      project: '',
      phase: '',
      unit: '',
      disc: '',
      Document: 'TQ',
      orginator: '',
      subject: '',
      description: '',
      attachmentFile: [],
      namesFilePeymanKar: [],
      kargaahDescription: '',
      FullNameKargah: '',
      kargaahAttachmentFile: [],
      namePeyvastKargah: [],
      kargaahAttachmentDescription: '',
      attachmentDescription: '',
      userDetail: {},
      loading: '',
      pictureShow: '',
      issueby: {},
      revision: ''
    }
  }
  componentDidMount () {
    this.setState(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props)
    }
  }
  haldeShowName = obj => {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  render () {
    return (
      <div className='w-100 row justify-content-start m-0'>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              handleCheckText(this.state.id) ? 'active' : ''
            }`}
          >
            <label>شماره شناسه سند</label>
            <input
              readOnly={true}
              type='text'
              name='id'
              value={handleString(this.state.id)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              handleCheckText(this.state.contractNumber) ? 'active' : ''
            }`}
          >
            <label>شماره قرارداد</label>
            <input
              readOnly={true}
              type='text'
              name='contractNumber'
              value={handleString(this.state.contractNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              handleCheckText(this.state.refrenceNumber) ? 'active' : ''
            }`}
          >
            <label>شماره مرجع</label>
            <input
              readOnly={true}
              type='text'
              name='refrenceNumber'
              value={handleString(this.state.refrenceNumber)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'mapNo' || handleCheckText(this.state.mapNo)
                ? 'active'
                : ''
            }`}
          >
            <label>
              شماره نقشه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='mapNo'
              value={handleString(this.state.mapNo)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'project' ||
              handleCheckText(this.state.project)
                ? 'active'
                : ''
            }`}
          >
            <label>
              پروژه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='project'
              value={handleString(this.state.project)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'phase' || handleCheckText(this.state.phase)
                ? 'active'
                : ''
            }`}
          >
            <label>
              فاز
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='phase'
              value={handleString(this.state.phase)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'unit' || handleCheckText(this.state.unit)
                ? 'active'
                : ''
            }`}
          >
            <label>
              ناحیه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='unit'
              value={handleString(this.state.unit)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'disc' || handleCheckText(this.state.disc)
                ? 'active'
                : ''
            }`}
          >
            <label>
              دیسیپلین
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='disc'
              value={handleString(this.state.disc)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ${
              this.state.foucs === 'revision' ||
              handleCheckText(this.state.revision)
                ? 'active'
                : ''
            }`}
          >
            <label>
              Rev.
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              className='text-left'
              type='text'
              name='revision'
              value={handleString(this.state.revision)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'Document' ||
              handleCheckText(this.state.Document)
                ? 'active'
                : ''
            }`}
          >
            <label>
              نوع سند
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='Document'
              value={handleString(this.state.Document)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'orginator' ||
              handleCheckText(this.state.orginator)
                ? 'active'
                : ''
            }`}
          >
            <label>
              درخواست کننده
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='orginator'
              value={handleString(this.state.orginator)}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'subject' ||
              handleCheckText(this.state.subject)
                ? 'active'
                : ''
            }`}
          >
            <label>
              موضوع
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={true}
              type='text'
              name='subject'
              value={handleString(this.state.subject)}
            />
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian textarea ${
              this.state.foucs === 'description' ||
              handleCheckText(this.state.description)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>
                شرح درخواست / پرسش فنی (TQ)
                <span className='star IranSans_Bold'>*</span>
              </label>
              <textarea
                className='w-100'
                type='text'
                name='description'
                readOnly={true}
                value={handleString(this.state.description)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className={`field-form persian`}>
            <label>
              مدارک پیوست
              <span className='star IranSans_Bold'>*</span>
            </label>
            <div className='pl-1 allName col row m-0 justify-content-end'>
              {this.haldeShowName(this.state.attachmentFile).map(
                (data, key) => (
                  <a href={data} key={key} target='_blank' rel='noreferrer'>
                    <span>
                      <VisibilityIcon className='ml-1' />
                      {`پیوست ${key + 1}`}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'attachmentDescription' ||
              handleCheckText(this.state.attachmentDescription)
                ? 'active'
                : ''
            }`}
          >
            <label>شرح پیوست</label>
            <input
              type='text'
              readOnly={true}
              name='attachmentDescription'
              value={handleString(this.state.attachmentDescription)}
            />
          </div>
        </div>
        <div className='title-password col-12'>
          <h2 className='IranSans_Bold'>
            نظر دفتر فنی پیمانکار / مهندسی کارگاهی
          </h2>
          <div className='line'></div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian textarea ${
              this.state.foucs === 'kargaahDescription' ||
              handleCheckText(this.state.kargaahDescription)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label>
                شرح
                <span className='star IranSans_Bold'>*</span>
              </label>
              <textarea
                className='w-100'
                type='text'
                name='kargaahDescription'
                readOnly={true}
                value={handleString(this.state.kargaahDescription)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'FullNameKargah' ||
              handleCheckText(this.state.FullNameKargah)
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label>
                نام و نام خانوادگی
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                type='text'
                name='FullNameKargah'
                value={
                  this.state.issueby
                    ? handleString(
                        `${this.state.issueby.first_name} ${this.state.issueby.last_name}`
                      )
                    : ''
                }
              />
              <div
                className='Signature'
                onClick={() =>
                  this.setState({
                    popUp: true,
                    pictureShow: this.state.issueby
                      ? this.state.issueby.sign
                      : ''
                  })
                }
              >
                <span>
                  <VisibilityIcon />
                  امضا
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className={`field-form persian`}>
            <label>پیوست</label>
            <div className='pl-1 allName col row m-0 justify-content-end'>
              {this.haldeShowName(this.state.kargaahAttachmentFile).map(
                (data, key) => (
                  <a href={data} target='_blank' rel='noreferrer' key={key}>
                    <span>
                      <VisibilityIcon className='ml-1' />
                      {`پیوست ${key + 1}`}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              this.state.foucs === 'kargaahAttachmentDescription' ||
              handleCheckText(this.state.kargaahAttachmentDescription)
                ? 'active'
                : ''
            }`}
          >
            <label>شرح پیوست</label>
            <input
              type='text'
              readOnly={true}
              name='kargaahAttachmentDescription'
              value={handleString(this.state.kargaahAttachmentDescription)}
            />
          </div>
        </div>
        <div className='title-password col-12'>
          <h2 className='IranSans_Bold'>تاثیر بر دیسیپلین ها</h2>
          <div className='line'></div>
        </div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className='disiplin-checkbox'>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`architecture`}>
                {this.state.architecture === 'true' ||
                this.state.architecture === '1' ||
                this.state.architecture === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                معماری
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`construction`}>
                {this.state.construction === 'true' ||
                this.state.construction === '1' ||
                this.state.construction === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                عمران و سازه
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`electricity`}>
                {this.state.electricity === 'true' ||
                this.state.electricity === '1' ||
                this.state.electricity === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                برق
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`heating`}>
                {this.state.heating === 'true' ||
                this.state.heating === '1' ||
                this.state.heating === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                گرمایش و تهویه مطبوع
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`piping`}>
                {this.state.piping === 'true' ||
                this.state.piping === '1' ||
                this.state.piping === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                لوله گذاری
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`tool`}>
                {this.state.tool === 'true' ||
                this.state.tool === '1' ||
                this.state.tool === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                ابزار
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`mechanic`}>
                {this.state.mechanic === 'true' ||
                this.state.mechanic === '1' ||
                this.state.mechanic === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                مکانیک
              </label>
            </div>
            <div className='checkbox'>
              <label className={'full'} htmlFor={`other`}>
                {this.state.other === 'true' ||
                this.state.other === '1' ||
                this.state.other === 'YES' ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                سایر
              </label>
            </div>
          </div>
          {this.state.other && this.state.otherDescription ? (
            <div className='col-12 mt-3 mb-3'>
              <TagsInput
                disabled
                inputProps={{
                  className: 'react-tagsinput-input tagsInput',
                  placeholder: ''
                }}
                value={this.state.otherDescription.split(',')}
              />
            </div>
          ) : (
            ''
          )}
          <div className='col-12'>
            <div className='row-disiplin row'>
              <label>اثر هزینه ای</label>
              <div className='col row m-0'>
                <div className='col-xl-3 col-lg-3 col-md-4'>
                  <div className={`main-toggle align-items-center active`}>
                    <div className='p-0'>
                      <span>بله</span>
                    </div>
                    <div className={`toggle-button`}>
                      <label className='switch'>
                        <input
                          type='checkbox'
                          className='d-none'
                          name={`costImpact`}
                          disabled
                          checked={
                            this.state.costImpact === 'POSITIVE' ||
                            this.state.costImpact === 'NEGETIVE'
                          }
                        />
                        <span className='slider'></span>
                      </label>
                    </div>
                    <div className='p-0'>
                      <span>خیر</span>
                    </div>
                  </div>
                </div>
                <div className='col disiplin-checkbox m-0'>
                  {this.state.costImpact !== 'NO' ? (
                    <React.Fragment>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`costImpactPositive`}
                        >
                          {this.state.costImpact === 'POSITIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          مثبت
                        </label>
                      </div>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`costImpactNegative`}
                        >
                          {this.state.costImpact === 'NEGETIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          منفی
                        </label>
                      </div>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {this.state.costImpactDescription &&
              this.state.costImpactDescription !== '' ? (
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      handleCheckText(this.state.costImpactDescription)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        توضیحات
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100'
                        type='text'
                        name='costImpactDescription'
                        value={handleString(this.state.costImpactDescription)}
                        readOnly={true}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='row-disiplin row'>
              <label>اثر زمانی</label>
              <div className='col row m-0'>
                <div className='col-xl-3 col-lg-3 col-md-4'>
                  <div className={`main-toggle align-items-center active`}>
                    <div className='p-0'>
                      <span>بله</span>
                    </div>
                    <div className={`toggle-button`}>
                      <label className='switch'>
                        <input
                          type='checkbox'
                          className='d-none'
                          name={`timeImpact`}
                          disabled
                          checked={
                            this.state.timeImpact === 'POSITIVE' ||
                            this.state.timeImpact === 'NEGETIVE'
                          }
                        />
                        <span className='slider'></span>
                      </label>
                    </div>
                    <div className='p-0'>
                      <span>خیر</span>
                    </div>
                  </div>
                </div>
                <div className='col disiplin-checkbox m-0'>
                  {this.state.timeImpact !== 'NO' ? (
                    <React.Fragment>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`timeImpactPositive`}
                        >
                          {this.state.timeImpact === 'POSITIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          مثبت
                        </label>
                      </div>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`timeImpactNegative`}
                        >
                          {this.state.timeImpact === 'NEGETIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          منفی
                        </label>
                      </div>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {this.state.timeImpactDescription &&
              this.state.timeImpactDescription !== '' ? (
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      handleCheckText(this.state.timeImpactDescription)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        توضیحات
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100'
                        type='text'
                        name='timeImpactDescription'
                        value={handleString(this.state.timeImpactDescription)}
                        readOnly={true}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='row-disiplin row'>
              <label>اثر بر کیفیت</label>
              <div className='col row m-0'>
                <div className='col-xl-3 col-lg-3 col-md-4'>
                  <div className={`main-toggle align-items-center active`}>
                    <div className='p-0'>
                      <span>بله</span>
                    </div>
                    <div className={`toggle-button`}>
                      <label className='switch'>
                        <input
                          type='checkbox'
                          className='d-none'
                          name={`qualityImpact`}
                          disabled
                          checked={
                            this.state.qualityImpact === 'POSITIVE' ||
                            this.state.qualityImpact === 'NEGETIVE'
                          }
                        />
                        <span className='slider'></span>
                      </label>
                    </div>
                    <div className='p-0'>
                      <span>خیر</span>
                    </div>
                  </div>
                </div>
                <div className='col disiplin-checkbox m-0'>
                  {this.state.qualityImpact !== 'NO' ? (
                    <React.Fragment>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`qualityImpactPositive`}
                        >
                          {this.state.qualityImpact === 'POSITIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          مثبت
                        </label>
                      </div>
                      <div className='checkbox mr-1 ml-1'>
                        <label
                          className='w-auto'
                          htmlFor={`qualityImpactNegative`}
                        >
                          {this.state.qualityImpact === 'NEGETIVE' ? (
                            <CheckBoxRoundedIcon />
                          ) : (
                            <CheckBoxOutlineBlankRoundedIcon />
                          )}
                          منفی
                        </label>
                      </div>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              {handleCheckText(this.state.qualityImpactDescription) ? (
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      handleCheckText(this.state.qualityImpactDescription)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        توضیحات
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100'
                        type='text'
                        name='qualityImpactDescription'
                        value={handleString(
                          this.state.qualityImpactDescription
                        )}
                        readOnly={true}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {this.state.popUp ? (
          <Sign
            close={(e, picture) =>
              this.setState({ popUp: e, pictureShow: picture })
            }
            pictureShow={this.state.pictureShow}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div
        className='backGroundPopup'
        onClick={() => this.props.close(false, '')}
      >
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
