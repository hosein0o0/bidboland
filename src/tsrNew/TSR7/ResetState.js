class ResetState {
  handleSwtich = name => {
    let obj1 = this.ManageState(name)
    let obj2 = { notification_cc: [] }
    let merge = { ...obj1, ...obj2 }
    return merge
  }
  ManageState = name => {
    switch (name) {
      case 'mechanical':
        return {
          mechanical_instruction: '',
          mechanical_time_execution: null,
          mechanical_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          mechanical_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ]
        }
      case 'electrical':
        return {
          electrical_instruction: '',
          electrical_time_execution: null,
          electrical_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          electrical_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ]
        }
      case 'instrument':
        return {
          instrument_instruction: '',
          instrument_time_execution: null,
          instrument_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          instrument_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ]
        }
      case 'building':
        return {
          building_instruction: '',
          building_time_execution: null,
          building_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          building_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ]
        }
      default:
        return {}
    }
  }
}
export default ResetState
