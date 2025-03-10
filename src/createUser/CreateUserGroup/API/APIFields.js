import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
class APIFields {
    constructor(props) {
        this.data = props
    }
    handleClick = (e, indexParent, field) => {
        const { name, checked } = e.target
        const { setListSelected, listSelected, stateHook, setStateHook, handleArray } = this.data

        const list = listSelected || []
        const obj = list[indexParent] || {}
        obj[name] = checked ? true : false
        if (!checked) {
            obj[`${name}_show`] = false
            const objState = stateHook || {}
            objState[`${name}_management`] = false
            setStateHook(prevState => {
                return { ...prevState }
            })
            let { array } = handleArray(field)
            array?.forEach(fi => obj[fi.name] = false);
        }
        list[indexParent] = obj
        setListSelected(prevState => {
            return [...prevState]
        })
    }
    handleManagment = (e, field) => {
        const { checked, name } = e.target
        const { selected, stateHook, setStateHook, indexParent, setListSelected, listSelected , handleArray} = this.data
        const check = selected[field.name] ? true : false
        if (check) {
            const objState = stateHook || {}
            objState[name] = checked
            setStateHook(prevState => {
                return { ...prevState }
            })
            const list = listSelected || []
            const obj = list[indexParent] || {}
            obj[`${field.name}_show`] = checked ? true : false
            list[indexParent] = obj
            if (!checked) {
                let { array } = handleArray(field)
                array?.forEach(fi => obj[fi.name] = false);
            }
            setListSelected(prevState => {
                return [...prevState]
            })
        }
    }
    handleCheckBox = field => {
        const { selected } = this.data
        const check = selected[field.name] ? true : false
        if (check) {
            return {
                icon: <CheckBoxRoundedIcon />,
                _class: 'full'
            }
        } else {
            return {
                icon: <CheckBoxOutlineBlankRoundedIcon />,
                _class: 'empty'
            }
        }
    }
    handleClickSubField = e => {
        const { checked, name } = e.target
        const { listSelected, indexParent, setListSelected } = this.data
        const list = listSelected || []
        const obj = list[indexParent] || {}
        obj[name] = checked
        list[indexParent] = obj
        setListSelected(prevState => {
            return [...prevState]
        })
    }
}
export default APIFields