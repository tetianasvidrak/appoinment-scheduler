import CloseIcon from "../../assets/close-icon.svg";
import type { ModalProps } from "./index.model";

export const Modal = ({ children, handlerClick }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#bfbfbf]/50 bg-opacity-50 flex items-center justify-center z-10">
      <div className="relative bg-white p-4 rounded-lg shadow-[0_4px_10px_rgba(46,108,51,0.5)]">
        <img
          className="absolute right-2 top-2 w-6 h-6 cursor-pointer"
          src={CloseIcon}
          alt="close icon"
          onClick={handlerClick}
        />
        <div>{children}</div>
        {/* <div className="flex flex-col gap-3 mx-6 my-2">{children}</div> */}
      </div>
    </div>
  );
};
