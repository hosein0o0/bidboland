import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded'
import Fields from '../Fields'
import SubField from '../subField'
import handleCheckText from '../../../handleCheckText'
class APIAccess {
    constructor(props) {
        this.data = props
        this.refs = {}
    }
    CheckCounter = data => {
        // let totalCounter = 0
        // console.log(this)
        // const { handleState, props } = this.data
        // const { Selected } = props
        const manageArray = this.handleArray(data)
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
    handleElms = (name, elm) => {
        const { setRef, ref, setWidth } = this.data
        let obj = this.refs
        obj[name] = elm
        let merge = { ...obj, ...ref }
        if (name === 'label_0') setWidth(elm?.current?.offsetWidth || 0)
        setRef(merge)
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
    handleShowArray = (data, indexParent) => {
        const { array, status } = this.handleArray(data)
        const { listSelected, values } = this.data
        const selected = listSelected[indexParent] || {}
        const valObj = values[indexParent] || {}
        const publicDisabled = !handleCheckText(valObj?.value)
        const myPropsSend = { publicDisabled, selected, array, data, ...this.data , indexParent }
        switch (status) {
            case 'fields':
                return <Fields {...myPropsSend} />
            case 'subField':
                return <SubField {...myPropsSend} />
            default:
                break
        }
    }
}
export default APIAccess