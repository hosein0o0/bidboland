import React from "react";
import ToCC from "./ToCC";
import TextNote from "./text";
import Files from "./files";
const Body = props => {
    const { convertDate } = props
    const data = props.dataRow || {}
    const myProps = { convertDate, data }
    return (
        <div className='body-note'>
            <ToCC {...myProps} />
            <TextNote {...data} />
            <Files {...data} />
        </div>
    )
}
export default Body