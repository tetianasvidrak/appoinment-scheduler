import type { ClientType } from "../../model/client.model";

export type EditClientModalProps = {
  client: ClientType;
  onEdit: (id: string, data: Partial<ClientType>) => void;
  onDelete: (id: string) => void;
};
