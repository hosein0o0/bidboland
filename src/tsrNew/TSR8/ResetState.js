class ResetState {
  handleSwtich = name => {
    let object = this.ManageState(name) || {}
    return object
  }
  ManageState = name => {
    switch (name) {
      case 'electrical':
        return {
          electrical_export_date: null,
          electrical_instruction_description: '',
          electrical_execution_date: null,
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
          ],
          electrical_purchase_request: [
            {
              number: '',
              description: '',
              date: null
            }
          ],
          electrical_notification_cc: []
        }
      case 'mechanical':
        return {
          mechanical_export_date: null,
          mechanical_instruction_description: '',
          mechanical_execution_date: null,
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
          ],
          mechanical_purchase_request: [
            {
              number: '',
              description: '',
              date: null
            }
          ],
          mechanical_notification_cc: []
        }
      case 'protection':
        return {
          protection_export_date: null,
          protection_instruction_description: '',
          protection_execution_date: null,
          protection_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          protection_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          protection_purchase_request: [
            {
              number: '',
              description: '',
              date: null
            }
          ],
          protection_notification_cc: []
        }
      case 'welding':
        return {
          welding_export_date: null,
          welding_instruction_description: '',
          welding_execution_date: null,
          welding_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          welding_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          welding_purchase_request: [
            {
              number: '',
              description: '',
              date: null
            }
          ],
          welding_notification_cc: []
        }
    }
  }
}
export default ResetState
