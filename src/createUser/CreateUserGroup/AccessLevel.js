import React from "react";
import SelectAllHook from "./selectAll";
const AccsessLevel = props => {
  const {handleShowArray , data , indexParent} = props
  return (
    <div className='main-from-access'>
      <SelectAllHook {...props} />
      {handleShowArray(data , indexParent)}
    </div>
  )
}
export default AccsessLevel