import React from "react";
import APIFields from './API/APIFields'
import NameFields from "./nameFields";
import ToogleBtn from "./toogleBtn";
import SubField from "./subField";
const Fields = props => {
  const fns = new APIFields(props)
  const myProps = { ...fns, ...props }
  const { array } = props
  return (
    array?.map((field, key) =>
      <div className="w-100" key={key}>
        <div className='title-access'>
          <h3 className='text-title'>{field.label}</h3>
          <div className='line col pl-0'></div>
        </div>
        <div className='field-access'>
          <div className='row m-0 align-items-center w-100'>
            <NameFields field={field || {}} {...myProps} />
            <ToogleBtn field={field || {}} {...myProps} />
            {field?.subfields && <SubField field={field || {}} {...myProps} />}
          </div>
        </div>
      </div>
    )
  )
}
export default Fields