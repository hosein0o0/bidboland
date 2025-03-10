class ResetState{
static Reset_state ={
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
      review_result: true,
      suggested_execution_time : null,
      reject_msg : null
}
}
export default ResetState