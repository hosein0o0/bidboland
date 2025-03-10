import Fields from "../Fields"
import SubField from "../subField"
import handleCheckText from '../../../handleCheckText'

class APIAccess {
    constructor(props) {
        this.data = props
    }
    handleElms = (name, elm) => {
        const { setRef, ref, setWidth, Elm } = this.data
        let obj = Elm
        obj[name] = elm
        let merge = { ...obj, ...ref }
        if (name === 'label_0') setWidth(elm?.current?.offsetWidth || 0)
        setRef(merge)
    }
    handleShowArray = (data, indexParent) => {
        const { listSelected, values, API } = this.data
        const { handleArray } = API
        const { array, status } = handleArray(data)
        const selected = listSelected[indexParent] || {}
        const valObj = values[indexParent] || {}
        const publicDisabled = !handleCheckText(valObj?.value)
        const myPropsSend = { publicDisabled, selected, array, data, ...this.data, indexParent }
        switch (status) {
            case 'fields':
                return <Fields {...myPropsSend} />
            case 'subField':
                return <SubField {...myPropsSend} />
            default:
                break
        }
    }
    handleActive = num => {
        const { setActiveTab, setRight, setWidth, ref, state } = this.data
        const { accessList } = state
        let elm = ref[`label_${num}`]?.current,
            tab = ref.tab?.current
        const data = accessList[num] || {}
        if (tab && elm && data) {
            this.CheckCounter(data)
            let left = -(num * (tab.offsetWidth / 4) - elm.offsetWidth)
            tab.scrollTo({
                top: 0,
                left: left,
                behavior: 'smooth'
            })
            setRight(num * elm.offsetWidth)
            setWidth(elm.offsetWidth)
            setActiveTab(num)
        }
    }
    CheckCounter = data => {
        // let totalCounter = 0
        // console.log(this)
        const { API } = this.data
        const { handleArray } = API
        // const { Selected } = props
        const manageArray = handleArray(data)
        if (manageArray?.array) {
            // let filter = Object.keys(manageArray?.array).map(value => {
            //     return manageArray?.array[value].name
            // })
            // Object.keys(Selected).map(obj => {
            //     if (filter.includes(obj)) {
            //         if (Selected[obj]) {
            //             totalCounter++
            //         }
            //     }
            //     return true
            // })
        }
        // handleState({ totalCounter: totalCounter })
    }
}
export default APIAccess