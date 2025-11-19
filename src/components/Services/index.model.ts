export type ModalState =
  | {
      type: "edit";
    }
  | { type: "create" };

export type ServiceAction = "create" | "edit" | "delete";
