import type { ErrorMessageProps } from "./index.model";

export const ErrorMessage = ({ children, message }: ErrorMessageProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 flex-grow">
      {children}
      <span className="ml-2 text-gray-500">{message}</span>
    </div>
  );
};
