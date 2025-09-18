import type { ClientPayload, ClientType } from "../../model/client.model";

export type EditClientModalProps = {
  client: ClientType;
  onEdit: (id: string, data: ClientPayload) => void;
  onDelete: (id: string) => void;
};
