class ResetState {
  handleSwtich = name => {
    let obj1 = this.ManageState(name)
    let obj2 = { notification_cc: [] }
    let merge = { ...obj1, ...obj2 }
    return merge
  }
  ManageState = name => {
    let nameList = `${name}_executed_problems`
    let list = [
      {
        description: '',
        followUp: '',
        actionDate: null,
        confirmation: false
      }
    ]
    return {
      [nameList]: list
    }
  }
}
export default ResetState
