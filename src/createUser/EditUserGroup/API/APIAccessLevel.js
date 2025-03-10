import handleCheckText from "../../../handleCheckText"
import handleString from "../../../handleString"
import StaticData from '../../../staticData'
import axios from "axios"
import Message from '../../../notification/Message'
import Notification from '../../../notification/notification'
class APIAccessLevel {
    constructor(props) {
        this.data = props
    }
    handleListArea = () => {
        const { values } = this.data
        const allVals = Object.keys(values || []).map(val => {
            let obj = values[val] || {}
            return obj.value
        })
        const { state } = this.data
        const { category_list } = state
        const filter = category_list?.filter(cat => !allVals.includes(cat.value))
        return filter || []
    }
    sortPermission = (values) => {
        const { state } = this.data
        const { category_id } = state
        const sort = values.sort((a) => {
            if (a.value === category_id?.value) return -1
            else return 1
        })
        return sort
    }
    getValues = permission => {
        const result = Object.keys(permission || []).map(eachPer => {
            let obj = permission[eachPer] || {}
            let arrayResult = Object.keys(obj).map((index) => {
                const key = index
                const array = obj[index] || []
                let json = array[0] || {}
                json['value'] = key
                const values = json
                return { values, key }
            })
            return arrayResult[0]
        })
        return result
    }
    getValueObjs = vals => {
        const { state } = this.data
        const { category_list } = state
        const filter = category_list?.filter(cat => vals?.some(id => cat.value === id))
        const result = this.sortPermission(filter || [])
        return result
    }
    getSortdata = (array) => {
        const { state } = this.data
        const { category_list } = state
        const filter = array?.filter(permission => category_list?.some(cat => permission?.value === cat.value))
        const result = this.sortPermission(filter || [])
        return result
    }
    eachData = (array) => {
        const values = Object.keys(array).map(indexArray => {
            let obj = array[indexArray] || {}
            return obj?.values
        })
        const keys = Object.keys(array).map(indexArray => {
            let obj = array[indexArray] || {}
            return obj?.key
        })
        return { ids: keys, arrayValues: values }
    }
    ValuesCategory = () => {
        const { state, setCounter, setValues, setListSelected } = this.data
        const { permission } = state
        setCounter(permission?.length || 1)
        const data = this.getValues(permission),
            each = this.eachData(data),
            { ids, arrayValues } = each,
            vals = this.getValueObjs(ids),
            listSelected = this.getSortdata(arrayValues)
        setListSelected(listSelected)
        setValues(vals)
    }
    handleDelete = index => {
        const { values, setValues, setCounter, counter, setListSelected, listSelected } = this.data
        setCounter(counter - 1)
        let array = values,
            array2 = listSelected
        array.splice(index, 1)
        array2.splice(index, 1)
        setValues(prevState => {
            return [...prevState]
        })
        setListSelected(prevState => {
            return [...prevState]
        })
    }
    handleSubmit = () => {
        const { values, listSelected, state, handleState } = this.data
        const { _groupTiltle, nameGroup, _groupName, offiecTop, unitTop, unit, token, category_id, id } = state
        let permission = {}
        values.forEach((data, index) => permission[data?.value] = [listSelected[index]] || {})
        const handleNameGroup = () => {
            let resultText = ''
            if (handleCheckText(nameGroup)) {
                switch (nameGroup) {
                    case 'مدیر':
                        if (offiecTop) resultText = `مدیر - ${offiecTop.label}`
                        break
                    case 'رئیس':
                        if (unitTop) resultText = `رئیس - ${unitTop.label}`
                        break
                    case 'سایر':
                        if (handleCheckText(_groupTiltle) && handleCheckText(_groupName)) {
                            resultText = `${handleString(
                                _groupTiltle
                            ).trim()} - ${handleString(_groupName).trim()}`
                        }
                        break
                    default:
                        resultText = ''
                        break
                }
            }
            return resultText
        }
        const Title = handleNameGroup()
        const check = handleCheckText(Title) && handleCheckText(unit?.value) && handleCheckText(category_id?.value)
        if (check) {
            const url = `${StaticData.domainIp}/role/update/${id}`
            handleState({ loading: 'submit', disabled: true })
            const datareg = new FormData()
            datareg.append('title', Title)
            datareg.append('unit_id', handleString(unit?.value))
            datareg.append('permission', JSON.stringify([permission]))
            datareg.append('category_id', handleString(category_id?.value))
            axios({
                method: 'post',
                url: url,
                data: datareg,
                headers: {
                    Authorization: token ? `Bearer ${token}` : null
                }
            })
                .then(response => {
                    handleState({ loading: '' })
                    if (response.status === 200) {
                        Notification.notify(Message.text(900), 'success')
                        setTimeout(() => {
                            handleState({ disabled: false, redirect: true })
                        }, 5000)
                    } else {
                        handleState({ disabled: false })
                        Notification.notify(Message.text(response.status), 'error')
                    }
                })
                .catch(err => {
                    handleState({ loading: '', disabled: false })
                    if (err.response) {
                        Notification.notify(Message.text(err.response.status), 'error')
                    }
                })
        } else {
            Notification.notify(Message.text(99), 'error')
        }
    }
    handleDisabledSubmit = () => {
        const { values, listSelected } = this.data
        let result = listSelected?.length === values?.length && values?.length === 0
        return result
    }
}
export default APIAccessLevel