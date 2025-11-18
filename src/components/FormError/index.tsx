const FormError = ({ message }: { message?: string }) => {
  return (
    <span className="text-red-500 h-5 text-sm block">{message || ""}</span>
  );
};
export default FormError;
