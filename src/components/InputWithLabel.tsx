import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type InputWithLabelProps = {
  id: string;
  label: string;
  value: string;
  type: HTMLInputTypeAttribute;
  onInputChange: (event: ChangeEvent) => void;
  isFocused: boolean;
};

// Reusable component
export const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
}: InputWithLabelProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        autoFocus={isFocused}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

