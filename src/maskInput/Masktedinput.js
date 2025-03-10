import InputMask from 'react-input-mask';
import React from 'react';
function Input(props) {
    return <InputMask
        mask={props.mask}
        maskChar={props.maskChar}
        value={props.value.toString().replace(/^(([0-1][0-9]|2[0-3]|[0-9])|([0-1][0-9]|2[0-3]|[0-9])(:|h)[0-5]?[0-9]?)$/, "$1")}
        name={props.name}
        onChange={props.onChange}
        onFocus={(e) => props.onFocus(e)}
        onBlur={props.onBlur}
    />;
}
export default Input