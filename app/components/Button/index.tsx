import IButton from "./IButton";

const Button = ({ children, className, onClick }: IButton) => {
  return (
    <button
      className={`w-full rounded border border-gray-300 p-2 text-sm hover:bg-gray-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
