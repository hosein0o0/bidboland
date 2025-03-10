import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Rampco from './rampco'
import BidBoland from './bidboland'
import StaticData from './staticData'
import Pars from './PARS'
let routes = ''
if (StaticData.ProjectName === 'RAMPCO') {
  routes = Rampco
} else if (StaticData.ProjectName === 'BIDBOLAND') {
  routes = BidBoland
} else if (StaticData.ProjectName === 'Pars') {
  routes = Pars
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
ReactDOM.render(routes, document.getElementById('root'))
reportWebVitals()
