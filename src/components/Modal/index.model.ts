export type ModalProps = {
  children: React.ReactNode;
  handlerClick: () => void;
  text?: string;
};

export type ModalState = {
  type: "add" | "edit";
  employeeId: string;
  time: string;
};
