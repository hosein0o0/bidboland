import React from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded'
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded'
function BoxChat (props) {
  return (
    <div className='col-xl-6 col-lg-6 col-12'>
      <div className='main-box-chat'>
        <div className='title-chat'>
          <h4 className='m-0 title-chat-text'>مکالمه</h4>
        </div>
        {props.state.userSelected ? (
          <React.Fragment>
            <div className='main-items-chat ltr'>
              <div className='item-chat rtl in-chat'>
                <div className='text-chat'>
                  <p>
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                    مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
                  </p>
                </div>
                <div className='status-text'>
                  <DoneAllIcon className='seen' />
                  <span className='IranSans_Medium_FA d-block tile-text'>
                    19:05
                  </span>
                </div>
              </div>
              <div className='item-chat rtl out-chat'>
                <div className='text-chat'>
                  <p>
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                    مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
                  </p>
                </div>
                <div className='status-text'>
                  <span className='IranSans_Medium_FA d-block tile-text'>
                    19:05
                  </span>
                </div>
              </div>
              <div className='item-chat rtl in-chat'>
                <div className='text-chat'>
                  <p>
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                    مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
                  </p>
                </div>
                <div className='status-text'>
                  <DoneAllIcon className='seen' />
                  <span className='IranSans_Medium_FA d-block tile-text'>
                    19:05
                  </span>
                </div>
              </div>
              <div className='item-chat rtl out-chat'>
                <div className='text-chat'>
                  <p>
                    در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                    مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
                  </p>
                </div>
                <div className='status-text'>
                  <span className='IranSans_Medium_FA d-block tile-text'>
                    19:05
                  </span>
                </div>
              </div>
              <div className='item-chat rtl out-chat'>
                <div className='text-chat'>
                  <p>
                    و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                    روزنامه و مجله در ستون و سطرآنچنان که لازم است
                  </p>
                </div>
                <div className='status-text'>
                  <span className='IranSans_Medium_FA d-block tile-text'>
                    19:05
                  </span>
                </div>
              </div>
            </div>
            <div className='send-message'>
              <div className='submit-message'>
                <button className='btn-submit-message'>
                  <SendRoundedIcon />
                </button>
              </div>
              <div className='text-message-send'>
                <input placeholder='پیام خود را وارد بنویسید...'/>
                <div className='upload-file'>
                  <input id='upload-file' className='d-none' type='file' />
                  <label className='m-0 d-flex pointer' htmlFor='upload-file'>
                    <AttachFileRoundedIcon />
                  </label>
                </div>
                <div className='emoji pointer'>
                  <SentimentSatisfiedRoundedIcon />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default BoxChat
