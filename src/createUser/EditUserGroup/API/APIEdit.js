import axios from "axios"
import Notification from "../../../notification/notification"
import Message from "../../../notification/Message"
import StaticData from '../../../staticData'
import handleString from "../../../handleString"
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded'
class APIEdit {
    constructor(props) {
        this.data = props
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
    ManageNameGroup = content => {
        const { roleDetail } = content
        const title = roleDetail?.title
        const { state } = this.data
        const { nameGroup_list } = state
        const array = title.split(' - ') || []
        let filter = nameGroup_list?.filter(group => group.value === handleString(array[0]))
        let arrayResult = filter.length ? filter : [{ value: 'سایر', label: 'سایر' }]
        const objResult = arrayResult[0] || {}
        const value = handleString(objResult?.value)
        return { nameGroup: value, ...this.manageOffice(value, title, content) }
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
    filterCategory = (array, id) => {
        const filter = array?.filter(data => data.value === id) || []
        return filter[0] || {}
    }
    fetchDateAPI = (id) => {
        const { state, handleState } = this.data
        const { token } = state
        axios
            .get(`${StaticData.domainIp}/role/getRole/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async response => {
                if (response.status === 200) {
                    const { content } = response?.data
                    const { office_list, unit_list_for_title, category_list, roleDetail, permissionList } = content
                    const obj = this.ManageNameGroup(content || {})
                    handleState({
                        ...obj,
                        office_list: office_list || [],
                        unit_list_for_title: unit_list_for_title || {},
                        category_list: category_list || [],
                        permission: roleDetail?.permission || [],
                        accessList: this.handleArrayIndex(permissionList),
                        category_id: this.filterCategory(category_list, roleDetail?.category_id)
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
            const result = office_list?.filter(data => data.label === "پیمانکاری")
            handleState({ office: result[0] || {} })
            this.SelectOffice(result[0] || {})
        }
    }
    manageOffice = (nameGroup, title, content) => {
        const { office_list, unit_list_for_title } = content
        const arrayTxt = handleString(title).split(' - ') || []
        switch (nameGroup) {
            case 'رئیس':
                const filterUnit = unit_list_for_title?.filter(data => data.label === handleString(arrayTxt[1])) || []
                return {
                    unitTop: filterUnit[0],
                    office: this.filterOffice(content)
                }
            case 'مدیر':
                const filterOffice = office_list?.filter(data => data.label === handleString(arrayTxt[1])) || []
                return {
                    offiecTop: filterOffice[0],
                    office: this.filterOffice(content)
                }
            case 'سایر':
                return {
                    _groupTiltle: handleString(arrayTxt[0]),
                    _groupName: handleString(arrayTxt[1]),
                    office: this.filterOffice(content)
                }
            case 'پیمانکار':
                return {
                    _groupName: 'پیمانکار',
                    _groupTiltle: 'پیمانکار',
                    office: this.filterOffice(content)
                }
            default:
                return {}
        }
    }
    filterOffice = content => {
        const roleDetail = content?.roleDetail || {}
        const { office, unit } = roleDetail
        const office_list = content?.office_list || []
        const filter = office_list.filter(data => data.label === office) || []
        const result = filter[0] || {}
        this.getUnlitList(result, unit)
        return result
    }
    getUnlitList = (office, unitValue) => {
        const { state, handleState } = this.data
        const { token } = state
        const url = `${StaticData.domainIp}/role/getListUnit/${office?.value}`
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(async response => {
                if (response.status === 200) {
                    const { unit_list } = response?.data?.content
                    const filter = unit_list?.filter(data => data.label === unitValue) || []
                    handleState({ unit: filter[0], unit_list })
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
    handleCheckBox = () => {
        const { data, state } = this.data
        const { totalCounter } = state
        switch (totalCounter) {
            case 0:
                return {
                    icon: <CheckBoxOutlineBlankRoundedIcon />,
                    className: 'empty'
                }
            case this.handleArray(data).array.length:
                return {
                    icon: <CheckBoxRoundedIcon />,
                    className: 'full'
                }
            default:
                return {
                    icon: <IndeterminateCheckBoxRoundedIcon />,
                    className: 'half'
                }
        }
    }
    handleArray = (data = {}) => {
        const { subfields, fields } = data
        let result = {
            array: [],
            status: ''
        }
        if (fields) {
            result = {
                array: fields || [],
                status: 'fields'
            }
        } else if (subfields) {
            result = {
                array: subfields || [],
                status: 'subfields'
            }
        }
        return result
    }
}
export default APIEdit