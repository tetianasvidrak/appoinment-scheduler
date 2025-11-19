export type ModalState =
  | {
      type: "edit";
    }
  | { type: "create" };

export type ClientAction = "create" | "edit" | "delete";
