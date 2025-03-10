import React, { Component } from 'react'
import Body from './Body'
import Footer from './footer'
import APINote from './API'
export default class CrateNote extends Component {
  constructor (props) {
    super(props)
    this.APINote = new APINote(this)
    this.state = {
      attachment: []
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  render () {
    return (
      <>
        <Body {...this} />
        <Footer {...this} />
      </>
    )
  }
}
