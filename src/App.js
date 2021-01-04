import React, {useState, useEffect} from 'react';
import './App.scss';
import Form from './Form';
import Button from './Button';

function App() {

useEffect(() => {
  // alert('Ready')
}, [])

const initialValues = {
  layout:'horizontal',
  theme:''
}

var [values,setValues] = useState(initialValues);

const handleChange = e => {
    var {name , value } = e.target;
    setValues({
        ...values,
        [name]:value
    })
};

const switchTheme = e => {
    var  value  = e.target.value;
    // console.log(e.target.value)
    setValues({
      ...values,
      theme:value
    })

    console.log(values.theme)
  };

  return (
    <div className={`${values.theme === "dark" ? "dark" : "light"}`}>
      {/* Send Money */}
      
<div className="container">
<div className="form__box">
<div className="row">
            <div className="col-3">
              <Button value="light" label="Light Theme" className="btn btn-primary" onClick={switchTheme}/>
            </div>
            <div className="col-3">
              <Button value="dark" label="Dark Theme" className="btn btn-secondary" onClick={switchTheme}/>
            </div>
            <div className="col-6">
            <select type="text" name="layout" className="form-control" value={values.layout} onChange={handleChange}>
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
            </div>
          </div></div>
     
      <Form layout={values.layout}  />
      </div>

        {/* Form Layout */}
          {/* Form */}
    </div>
  );
}

export default App;
