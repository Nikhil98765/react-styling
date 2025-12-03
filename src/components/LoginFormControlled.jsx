import React, { useState } from 'react'

 const VALIDATION = {
   email: [
     {
       isValid: (value) => !!value,
       message: "Email should not be empty",
     },
     {
       isValid: (value) => /\S+@\S+\.\S+/.test(value),
       message: "Needs to be an email",
     },
   ],
   password: [
     {
       isValid: (value) => !!value,
       message: "Is required",
     },
   ],
 };

  const getErrorFields = (form) => {
    return Object.keys(form).reduce((prev, key) => {
      if (!VALIDATION[key]) return prev;

      const errorObject = VALIDATION[key]
        .map((validationObject) => ({
          isValid: validationObject.isValid(form[key]),
          message: validationObject.message,
        }))
        .filter((validationObject) => !validationObject.isValid);
      return { ...prev, [key]: errorObject };
    }, {});
  };

// Controlled react form
export const LoginFormControlled = () => {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [form, setForm] = useState({});

  const errorFields = getErrorFields(form);
  console.log("🚀 ~ LoginFormControlled ~ errorFields:", errorFields)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errorFields).flat().length > 0;

    if (hasErrors) return;
    
    alert(
      `Email: ${form.email}, password: ${form.password}`
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        {errorFields.email?.length ?
          errorFields.email.map((error) => (
            <span style={{ color: "red" }}>{error.message}</span>
          )): null
        }
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
        {errorFields.password?.length ?
          errorFields["password"].map((error) => (
            <span style={{ color: "red" }}>{error.message}</span>
          )): null
        }
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
