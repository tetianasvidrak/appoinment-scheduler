import type { ClientType } from "../../model/client.model";

export type ClientSearchProps = {
  clients: ClientType[];
  onChange: (client: ClientType) => void;
};
