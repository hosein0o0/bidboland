import React, { useState } from "react";
const HOC = (MyComponent) => {
    function NewComponent(props) {
        const [stateShow, setStateShow] = useState('list')
        const [dataRow, setDataRow] = useState({})
        const myProps = { dataRow, setDataRow, stateShow, setStateShow, ...props }
        return <MyComponent {...myProps} />
    }
    return NewComponent
}
export default HOC