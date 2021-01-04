import React from 'react'

function Button({type,label, className, onClick, layout, value}) {
    return (
        <div className={`btn__container btnlayout__${ layout }`} >
            <button type={type} className={className} value={value} onClick={onClick}>{label}</button>
        </div>
    )
}

export default Button
