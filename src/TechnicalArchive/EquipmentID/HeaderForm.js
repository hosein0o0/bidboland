import React, { Component } from 'react'
import Form from '../../Form/Form'
export default class HeaderForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      equipment_discipline: 'instrumentation',
      itemForm: [
        {
          name: 'Vendor Name',
          value: 'vendor_name'
        },
        {
          name: 'Doc No',
          value: 'doc_no'
        },
        {
          name: 'Tag No',
          value: 'tag no'
        },
        {
          name: 'Year Built',
          value: 'year_built',
          date: true
        },
        {
          name: 'Item No',
          value: 'item_no'
        },
        {
          name: 'Equipment Discipline',
          value: 'equipment_discipline',
          select: true,
          listItem: [
            { label: 'instrumentation', value: 'instrumentation' },
            { label: 'test', value: 'test' }
          ]
        }
      ],
      listItem: [
        { label: 'TRANSMITTER & GAUGE', value: 'transmitter' },
        { label: 'VALVES', value: 'valves' },
        { label: 'ANALYZER', value: 'analyzer' },
        { label: 'F&G', value: 'f_and_g' }
      ],
      equipment_category: '',
      vendor_name: '',
      doc_no: '',
      tag: '',
      year_built: null,
      item_no: ''
    }
  }
  componentDidMount () {
    this.props.handleState('equipment_discipline', 'instrumentation')
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.handleState([e.target.name], e.target.value)
    if (e.target.name === 'equipment_discipline') {
      this.setState({ equipment_category: '' })
    }
  }
  render () {
    return (
      <React.Fragment>
        <Form
          {...this}
          handleState={(name, value) => this.setState({ [name]: value })}
        />
        {this.state.equipment_discipline === 'instrumentation' && (
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form pl-1 ${
                this.state.equipment_category ||
                this.state.foucs === `equipment_category`
                  ? 'active'
                  : ''
              }`}
            >
              <label className='textarea'>Equipment Category</label>
              <select
                className='ltr'
                name={`equipment_category`}
                onChange={this.handleChange}
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                value={this.state.equipment_category}
              >
                <option className='d-none'></option>
                {this.state.listItem.map((item, _key) => (
                  <option key={_key} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
