import React from 'react'

const Select = React.forwardRef(({ className, name, id, placeholder, onChange, options, value }, ref) => ( 
        <select className={className } name={name} id={id} placeholder={placeholder} defaultValue={value} onChange={onChange} ref={ref}>
          {  options.map((item) => 
                <option key={item.id} value={item.value}  >{item.name}</option> 
          )
          }
        </select> 
)
);

export default Select;
