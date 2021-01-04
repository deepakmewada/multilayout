import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

const TransactionDetails = [
  {
    id: 1,
    labelname: "Send Country",
    type: "select",
    name: "sendCountry",
    placeholder: "Select Send Country",
    className: "form-control",
    options: [
      { id: 0, name: "-Select-", value: "" },
      { id: 1, name: "United Kingdom", value: "GBP" },
      { id: 2, name: "United State of America", value: "USD" },
      { id: 3, name: "China", value: "CNY" },
    ],
    valid: { required: true, message: "Send Country should not be blank" },
  },
  {
    id: 2,
    labelname: "Amount",
    type: "input",
    name: "amount",
    value: "",
    keyup: true,
    placeholder: "Enter Sending Amount",
    className: "form-control",
    valid: {
      required: true,
      message: "Amount should not be blank",
      minLength: 3,
    },
  },
  {
    id: 3,
    labelname: "Transfer Option",
    type: "select",
    name: "transferOption",
    value: "",
    placeholder: "Select Transfer Options",
    className: "form-control",
    options: [
      { id: 0, name: "-Select-", value: "" },
      { id: 1, name: "Fixed Rate", value: "Fixed" },
    ],
    valid: { required: true, message: "Transfer Options should not be blank" },
  },
];

const ReceiverDetails = [
  {
    id: 1,
    labelname: "Receiver Name",
    type: "select",
    name: "receiverName",
    placeholder: "Select Receiver Name",
    className: "form-control",
    value: "",
    options: [
      { id: 0, name: "-Select-", value: "" },
      { id: 1, name: "Deepak Mewada", value: "Deep" },
      { id: 2, name: "Bhavin Vadiya", value: "Bhavin" },
    ],
    valid: { required: true, message: "Receiver Name should not be blank" },
  },
  {
    id: 2,
    labelname: "Receiver Country",
    type: "select",
    name: "receiverCountry",
    placeholder: "Select Receiving Country",
    className: "form-control",
    value: "INR",
    options: [
      { id: 0, name: "-Select-", value: "" },
      { id: 1, name: "India", value: "INR" },
      { id: 2, name: "Bangladesh", value: "BDT" },
      { id: 3, name: "Sri Lanka", value: "LKR" },
    ],
    valid: { required: true, message: "Receiving Country should not be blank" },
  }
];

const DeliveryDetails = [
  {
    id: 1,
    labelname: "Receiving Mode",
    type: "select",
    name: "receivingMode",
    placeholder: "Select Receiving Mode",
    className: "form-control",
    value: "",
    options: [
      { id: 0, name: "-Select-", value: "" },
      { id: 1, name: "Cash Pickup", value: "CP" },
      { id: 2, name: "Credit to Account", value: "CTA" },
    ],
    valid: { required: true, message: "Receiving Mode should not be blank" },
  },
];

const Form = ({ layout }) => {
  //pushing all forms fields in initialFields

  const initialFields = {
    exchangeRate: "",
    receiverGets: "",
    transferFee: 5,
    sendCountry: "",
    amount: "",
    transferOption: "",
    receiverName: "",
    receiverCountry: "",
    receivingMode: ""
  }
  const [formData, setFormData] = useState(initialFields);
  const [rates, setRates] = useState({})

  
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'data.json').then(res => res.json()).then(data => {
      setRates(data)
    })

    console.log(formData);
    
   
  }, [formData]);

  const [values, setValues] = useState(initialFields);

  const handleChange = (e) => {
    var { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    })

  console.log(name, formData);
    if(formData.sendCountry !== "" && formData.receiverCountry !== "" && formData.amount !== ""){
      if(name === "sendCountry"){
        calcFunct(value,formData.receiverCountry);
      }else if(name === "receiverCountry"){
        calcFunct(formData.sendCountry,value);
      }
     }
  
   
  };


  // console.log(initialFields);

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  };

  const handleKeyUp = (e) => {
    // alert(0)
    if(formData.sendCountry !== "" && formData.receiverCountry !== "" && formData.amount !== ""){
      if (formData.amount > 99) {
        calcFunct(formData.sendCountry,formData.receiverCountry);
      }
    }
  };

  const calcFunct = (sc,rc) => {
    const getRates = sc+"_"+rc;
    console.log(rates[getRates], formData.amount);
    const getTotal = rates[getRates] * formData.amount;
    let newformData = {
      ...formData,
      receiverGets: getTotal
    }
    setFormData(newformData)
    
  }

  // const calcFunct = () => {
  //   const getRates = rates.initialFields['sendCountry']+"_"+rates.initialFields['receiverCountry'];
   
  //   setInitialFields({
  //     ...initialFields,
  //     getRates:getRates
  //   })
  // };

  return (
    <div className="form">
      <div className="form__box">
        <form onSubmit={handleSubmit(onSubmit)} className={`form__${layout}`}>
          <h4 className="form__subtl">Transaction Details</h4>
          <div className="row">
            {TransactionDetails.map((item) => (
              <div
                className={layout === "vertical" ? "col-6" : "col-12"}
                key={item.id}
              >
                <div className={`form-group group__${layout}`}>
                  <label>{item.labelname}</label>
                  <div className="input__wrap">
                    {item.type === "input" ? (
                      <>
                        <Input
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          onKeyUp={item.keyup === true ? handleKeyUp : ""}
                          onChange={handleChange}
                          ref={register(item.valid)}
                        />

                        {values[item.name]}
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {item.type === "select" ? (
                      <>
                        <Select
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          options={item.options}
                          onChange={handleChange}
                          ref={register(item.valid)}
                        />
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <h4 className="form__subtl">Receiver Details</h4>
          <div className="row">
            {ReceiverDetails.map((item) => (
              <div
                className={layout === "vertical" ? "col-6" : "col-12"}
                key={item.id}
              >
                <div className={`form-group group__${layout}`}>
                  <label>{item.labelname}</label>
                  <div className="input__wrap">
                    {item.type === "input" ? (
                      <>
                        <Input
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {item.type === "select" ? (
                      <>
                        <Select
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          options={item.options}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <h4 className="form__subtl">Delivery Details</h4>
          <div className="row">
            {DeliveryDetails.map((item) => (
              <div
                className={layout === "vertical" ? "col-6" : "col-12"}
                key={item.id}
              >
                <div className={`form-group group__${layout}`}>
                  <label>{item.labelname}</label>
                  <div className="input__wrap">
                    {item.type === "input" ? (
                      <>
                        <Input
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {item.type === "select" ? (
                      <>
                        <Select
                          name={item.name}
                          id={item.name}
                          className={item.className}
                          placeholder={item.placeholder}
                          options={item.options}
                          onChange={handleChange}
                          ref={register({ required: true })}
                        />
                        {errors[item.name] && (
                          <span className="error__text">
                            {item.valid.message}
                          </span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="row">
            <div
              className={`prefilled__text ${
                layout === "vertical" ? "col-4" : "col-12"
              }`}
            >
              <label>Transfer Fee :</label>
              <div id="transferFee">
                {values.amount > 99 ? values.transferFee : ""}{" "}
                {values.sendCountry}
              </div>
            </div>
            <div
              className={`prefilled__text ${
                layout === "vertical" ? "col-4" : "col-12"
              }`}
            >
              <label>Exchange Rate :</label>
              <div id="exchangeRate">
                {values.amount > 99
                  ? "1" +
                    formData.sendCountry +
                    "=" +
                    formData.exchangeRate +
                    "  " +
                    formData.receiverCountry
                  : ""}
              </div>
            </div>
            <div
              className={`prefilled__text ${
                layout === "vertical" ? "col-4" : "col-12"
              }`}
            >
              <label>Receiving Amount :</label>
              <div id="recAmount">
                {formData.receiverGets} {formData.receiverCountry}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            label="Submit"
            className="btn btn-primary"
            layout={layout}
          />
        </form>
      </div>
    </div>
  );
}

export default Form;
