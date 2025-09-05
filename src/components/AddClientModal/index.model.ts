import type { ClientType } from "../../model/client.model";

export type AddClientModelProps = {
  onAdd: (client: ClientType) => void;
  onClose: () => void;
};
