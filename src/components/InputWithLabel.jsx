
// Reusable component
export const InputWithLabel = ({id, label, value, type="text", onInputChange, isFocused}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} autoFocus={isFocused} value={value} onChange={onInputChange}/>
    </>
  );
};

