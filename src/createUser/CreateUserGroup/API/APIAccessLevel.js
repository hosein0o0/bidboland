// import Fields from '../Fields'
// import Exception from '../Exception'
import handleCheckText from '../../../handleCheckText'
import StaticData from '../../../staticData'
import handleString from '../../../handleString'
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import axios from 'axios'
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
    SelectAll = e => {
        const { handleState, PropsSelect, props } = this.data
        if (PropsSelect !== null) {
            const { data } = props
            const { checked } = e.target
            const length = this.handleArray(data).array
                ? this.handleArray(data).array.length
                : 0
            if (checked) {
                handleState({ totalCounter: length })
            } else {
                handleState({ totalCounter: 0 })
            }
            for (let value in PropsSelect) {
                let f = PropsSelect[value]
                if (f) f(checked)
            }
        }
    }
    handleSubmit = () => {
        const { values, listSelected, state, handleState } = this.data
        const { _groupTiltle, nameGroup, _groupName, offiecTop, unitTop, unit, token, category_id } = state
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
            const url = `${StaticData.domainIp}/role/create`
            handleState({ loading: 'submit', disabled: true })
            const datareg = new FormData()
            // console.log({
            //     category_id: handleString(category_id?.value),
            //     permission: [permission],
            //     title: Title,
            //     unit_id: handleString(unit?.value),
            //     values
            // })
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