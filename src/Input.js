import React from 'react'

const Input = React.forwardRef(({className, name, id, placeholder, onChange, value, onKeyUp}, ref) => (
    <>
        <input type="text" className={className} name={name} value={value} id={id} placeholder={placeholder} onKeyUp={onKeyUp} onChange={onChange} ref={ref}/>
        </>
    )
)


export default Input
