import type { ErrorMessageProps } from "./index.model";

export const ErrorMessage = ({ children, message }: ErrorMessageProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 flex-grow h-[220px]">
      {children}
      <span className="ml-2 text-gray-500">{message}</span>
    </div>
  );
};
