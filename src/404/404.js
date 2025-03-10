import React, { useState, useEffect } from 'react';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom'

function NotFound() {
    const [token] = useState(Cookies.get('token'))
    useEffect(() => {
      document.title = `صفحه مورد نظر یافت نشد`;
    });
    function goBack(){
        window.history.back()
    }
    if(token){
    return (
      <div className='notfound-404'>
          <div className='background'>
                <img src='/img/login-bg.jpg' alt='not-found'/>
          </div>
          <div className='text-notfound'>
              <h1>404</h1>
              <h3> متاسفانه صفحه مورد نظر یافت نشد!</h3>
              <button onClick={goBack}>
                  بازگشت به صفحه قبل
                  <ArrowBackRoundedIcon />
              </button>
          </div>
      </div>
    )
  }else return <Redirect to='/Login' />
  }
  export default NotFound