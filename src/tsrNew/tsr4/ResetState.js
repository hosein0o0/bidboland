class ResetState {
  static Reset_state = {
    hse_review: true,
    hazop_review: true,
    foreign_attachment: [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ],
    internal_attachment: [
      {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ],
    notification_cc: [],
    hse_review_msg_true: '',
    hse_review_msg_false: '',
    suggested_execution_time: null
  }
}
export default ResetState
