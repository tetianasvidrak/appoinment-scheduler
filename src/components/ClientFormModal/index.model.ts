import type { ClientPayload, ClientType } from "../../model/client.model";

export type ClientFormModalProps = {
  mode: "create" | "edit";
  initialData?: ClientType;
  onSubmit: (
    action: "create" | "edit" | "delete",
    payload?: ClientPayload,
    id?: string
  ) => void;
  onClose: () => void;
};
