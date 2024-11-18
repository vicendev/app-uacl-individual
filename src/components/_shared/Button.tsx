import { HTMLAttributes } from "react";

import clsx from "clsx"; // Opcional, para manejar clases condicionales

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export function Button({ disabled, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "px-4 py-2 text-xl border-gray-500 border-2 rounded transition-colors ease-in-out",
        {
          "bg-teal-500 hover:bg-teal-800 hover:text-teal-300": !disabled,
          "bg-gray-300 text-gray-500 cursor-not-allowed": disabled,
        },
        className
      )}
    />
  );
}

