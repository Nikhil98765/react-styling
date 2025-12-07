import React, { FormEvent, useRef } from 'react'

// UnControlled react form
export const LoginFormUncontrolled = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Email: ${emailRef.current?.value}, password: ${passwordRef.current?.value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email: </label>
      <input id="email" type="email" ref={emailRef} />
      
      <label htmlFor="password">Password: </label>
      <input type="password" id='password' ref={passwordRef} />

      <button type='submit'>Submit</button>
    </form>
  );
}
