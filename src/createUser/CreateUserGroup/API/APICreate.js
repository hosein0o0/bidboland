import handleString from "../../../handleString"
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
// import handleCheckText from "../../../handleCheckText"
import StaticData from '../../../staticData'
import axios from 'axios'
class APICreate {
    constructor(data) {
        this.data = data
    }
    fetchDateAPI = () => {
        const { state, handleState } = this.data
        const { token } = state
        if (token) {
            axios
                .get(`${StaticData.domainIp}/role/getAvailableList`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(async response => {
                    const {
                        office_list,
                        permissionList,
                        unit_list_for_title, category_list
                    } = response.data.content
                    if (response.status === 200) {
                        await handleState({
                            accessList: this.handleArrayIndex(permissionList),
                            office_list: office_list ? office_list : [],
                            unit_list_for_title: unit_list_for_title
                                ? unit_list_for_title
                                : [],
                            category_list: category_list
                        })
                    } else {
                        Notification.notify(Message.text(response.status), 'error')
                    }
                })
                .catch(err => {
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error')
                    }
                })
        }
    }
    handleArrayIndex = (array) => {
        let _result = []
        array.forEach(data => {
            let obj1 = data
            obj1['label'] = handleString(obj1['label'])
            obj1['name'] = handleString(obj1['name'])
            if (obj1.fields) {
                let array2 = obj1.fields
                let _result2 = []
                array2.forEach(data2 => {
                    let obj2 = data2
                    obj2['label'] = handleString(obj2['label'])
                    obj2['name'] = handleString(obj2['name'])
                    if (obj2.subfields) {
                        let array4 = obj2.subfields
                        let _result4 = []
                        array4.forEach(data4 => {
                            let obj4 = data4
                            obj4['label'] = handleString(obj4['label'])
                            obj4['name'] = handleString(obj4['name'])
                            _result4.push(obj4)
                        })
                        obj2['subfields'] = _result4
                    }
                    _result2.push(obj2)
                })
                obj1['fields'] = _result2
            } else if (obj1.subfields) {
                let array3 = obj1.subfields
                let _result3 = []
                array3.forEach(data3 => {
                    let obj3 = data3
                    obj3['label'] = handleString(obj3['label'])
                    obj3['name'] = handleString(obj3['name'])
                    _result3.push(obj3)
                })
                obj1['subfields'] = _result3
            }
            _result.push(obj1)
        })
        return _result
    }
    handleSelecTed = async (name, check) => {
        // const { state, handleState } = this.data
        // const { Selected } = state
        // let data = await Selected
        // data[name] = check ? 1 : 0
        // await handleState({ Selected: data })
    }
    OnFocus = name => {
        const { handleState } = this.data
        handleState({ foucs: name })
    }
    OnBlur = () => {
        const { handleState } = this.data
        handleState({ foucs: '' })
    }
    handleChange = e => {
        const { handleState } = this.data
        handleState({ [e.target.name]: handleString(e.target.value) })
    }
    SelectOffice = nextValue => {
        const { handleState, state } = this.data
        const { token } = state
        const { __isNew__, value } = nextValue
        handleState({ unit_list: [], unit: null })
        if (!__isNew__) {
            handleState({ office: nextValue })
            const url = `${StaticData.domainIp}/role/getListUnit/${value}`
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(async response => {
                    if (response.status === 200) {
                        const { unit_list } = response.data.content
                        handleState({ unit_list: unit_list })
                    } else {
                        Notification.notify(Message.text(response.status), 'error')
                    }
                })
                .catch(err => {
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error')
                    }
                })
        }
    }
    handleTotal = () => {
        let counter = 0
        const { state } = this.data
        const { accessList, Selected } = state
        if (accessList && Selected) {
            Object.keys(accessList).map(level => {
                let __fields = accessList[level].fields
                if (__fields) {
                    Object.keys(__fields).map(filed => {
                        if (Selected[__fields[filed].name]) {
                            counter++
                        }
                        return true
                    })
                }
                return true
            })
        }
        return counter
    }
    handleChangeCategory = e => {
        const { name, value } = e.target
        const { state, handleState } = this.data
        const { office_list } = state
        handleState({
            [name]: handleString(value),
            _groupTiltle: value === 'پیمانکار' ? 'نماینده' : '',
            unitTop: null,
            offiecTop: null,
            _groupName: value === 'پیمانکار' ? 'پیمانکار' : ''
        })
        if (value === 'پیمانکار') {
            const result = office_list.filter(data => data.label === "پیمانکاری")
            handleState({ office: result[0] || {} })
            this.SelectOffice(result[0] || {})
        }
    }
}
export default APICreate