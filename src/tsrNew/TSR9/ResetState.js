class ResetState {
  handleSwtich = name => {
    let obj1 = this.ManageState(name)
    let obj2 = { notification_cc: [] }
    let merge = { ...obj1, ...obj2 }
    return merge
  }
  ManageState = name => {
    switch (name) {
      case 'fixed_mechanical':
        return {
          fixed_mechanical_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
          fixed_mechanical_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          fixed_mechanical_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          fixed_mechanical_test_result: false,
          fixed_mechanical_marked_document: false
        }
      case 'rotating_mechanical':
        return {
          rotating_mechanical_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
          rotating_mechanical_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          rotating_mechanical_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          rotating_mechanical_test_result: false,
          rotating_mechanical_marked_document: false
        }
      case 'electrical':
        return {
          electrical_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
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
          electrical_test_result: false,
          electrical_marked_document: false
        }
      case 'instrument':
        return {
          instrument_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
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
          ],
          instrument_test_result: false,
          instrument_marked_document: false
        }
      case 'sensitive_equipment':
        return {
          sensitive_equipment_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
          sensitive_equipment_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          sensitive_equipment_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          sensitive_equipment_test_result: false,
          sensitive_equipment_marked_document: false
        }
      case 'repair_services':
        return {
          repair_services_instruction: [
            {
              group: '',
              instructionNumber: '',
              dateIssuanceInstructions: null,
              wo: '',
              wODate: null,
              startDate: null,
              endDate: null
            }
          ],
          repair_services_foreign_attachment: [
            {
              documentNumber: '',
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: '',
              AttachementName: [],
              Attachement: []
            }
          ],
          repair_services_internal_attachment: [
            {
              documentNumber: null,
              degreeTitle: '',
              numberPages: '',
              descriptionAttachment: ''
            }
          ],
          repair_services_test_result: false,
          repair_services_marked_document: false
        }
    }
  }
}
export default ResetState
