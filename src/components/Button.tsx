
type ButtonProps =  React.ComponentPropsWithoutRef<"button">;

// Reusable component
export const Button = ({type="button", onClick, children, ...rest}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
