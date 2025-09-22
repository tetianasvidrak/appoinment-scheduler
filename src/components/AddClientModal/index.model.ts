import type { ClientPayload } from "../../model/client.model";

export type AddClientModelProps = {
  onAdd: (client: ClientPayload) => void;
  onClose: () => void;
};
