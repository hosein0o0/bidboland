import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

class List {
  constructor(props) {
    this.data = props
  }
  handleDisUpload = (arrayField = []) => {
    const { state } = this.data
    let result = arrayField.length > 0 ? false : true
    let i = 0
    while (i < arrayField.length) {
      let fieldName = handleString(arrayField[i])
      if (!handleCheckText(state[fieldName])) {
        result = true
        break
      }
      i++
    }
    return result
  }
  handleListDetailEng1 = () => {
    const { state } = this.data
    const { status_check, projectCodeList } = state
    const result = [
      {
        name: 'Project Code',
        value: 'project_code',
        require: true,
        disabled: status_check === 2,
        select: true,
        listItem: projectCodeList
      },
      {
        name: 'Doc Code',
        value: 'documentNumber',
        require: true,
        disabled: status_check === 2
      },
      // {
      //   name: 'Rev',
      //   value: 'revision',
      //   require: true,
      //   type: 'number',
      //   maxLength: 2,
      //   disabled: status_check === 2
      // }
    ]
    return result
  }
  handleListDetailEng2 = () => {
    const { state } = this.data
    const { revisionList } = state
    const result = [
      {
        name: 'Rev',
        value: 'revision',
        require: true,
        type: 'number',
        maxLength: 2,
        select: true,
        listItem: revisionList
      },
      {
        name: 'Doc Code Contractor',
        value: 'documentNumberContractor'
      },
      { name: 'Doc Description', value: 'doc_description', require: true },
      { name: 'Discipline', value: 'discipline', require: true },
      { name: 'Doc Type', value: 'doc_type' },
      { name: 'Trans Code', value: 'transmitallNumber', require: true },
      {
        name: 'Trans Received Date',
        value: 'transmittal_receive_date',
        isGregorian: true,
        date: true,
        objectSetState: true,
        require: true
      },
      { name: 'POI', value: 'poi', require: true },
      { name: 'POI Status', value: 'poi_status', require: true },
      {
        name: 'Comment Sheet Code',
        value: 'comment_sheet_code'
      },
      {
        name: 'Comment Sheet Date',
        value: 'comment_sheet_date',
        isGregorian: true,
        date: true,
        objectSetState: true,
        disabled: state['comment_sheet_code'] ? false : true,
        require: state['comment_sheet_code'] ? true : false
      },
      { name: 'Reply Sheet Code', value: 'reply_sheet_code' },
      {
        name: 'Reply Sheet Date',
        value: 'reply_sheet_date',
        isGregorian: true,
        date: true,
        objectSetState: true,
        disabled: state['reply_sheet_code'] ? false : true,
        require: state['reply_sheet_code'] ? true : false
      },
      { name: 'Status', value: 'status' },
      { name: 'Remark', value: 'remark' },
      {
        name: 'Document File',
        value: 'document_path',
        upload: true,
        single: true,
        require: true,
        accept: 'application/pdf',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision'
        ])
      },
      {
        name: 'Transmittal File',
        value: 'transmittal_path',
        upload: true,
        single: true,
        require: true,
        accept: 'application/pdf',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision',
          'transmitallNumber'
        ])
      },
      {
        name: 'Comment Sheet',
        value: 'comment_sheet_path',
        upload: true,
        single: true,
        accept: 'application/pdf',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision',
          'comment_sheet_code'
        ])
      },
      {
        name: 'Reply sheet File',
        value: 'reply_sheet_path',
        upload: true,
        single: true,
        accept: 'application/pdf',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision',
          'reply_sheet_code'
        ])
      },
      {
        name: 'Native File',
        value: 'native_path',
        upload: true,
        single: true,
        require: true,
        accept:
          '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xls,.xlsm,.xlsx,.dwg,.csv',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision'
        ])
      },
      {
        name: 'Other Files',
        value: 'other_path',
        upload: true,
        single: false,
        accept: '*',
        disabled: this.handleDisUpload([
          'project_code',
          'documentNumber',
          'revision'
        ])
      }
    ]
    return result
  }
}
export default List
