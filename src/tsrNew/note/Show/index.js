import React from "react";
import Body from "./Body";
import API from './API'
const Show = props => {
    const myAPI = new API(props)
    const myProps = { ...myAPI, ...props }
    return (
        <>
            <Body {...myProps} />
        </>
    )
}
export default Show