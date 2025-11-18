import type { ClientType } from "../../model/client.model";

export type ClientSearchProps = {
  clients: ClientType[];
  selected: string | null;
  onChange: (client: string) => void;
};
