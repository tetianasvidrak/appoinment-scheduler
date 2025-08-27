import React from "react";
import { List, ListItem } from "@mui/material";

import { EditClientModel } from "../EditClientModal";
import { Modal } from "../Modal";

import type { ClientType } from "../../model/client.model";
import type { ClientListProps } from "./index.model";

export const ClientList = ({ clients, onEdit, onDelete }: ClientListProps) => {
  const [selectedClient, setSelectedClient] = React.useState<ClientType | null>(
    null
  );
  return (
    <div>
      <List>
        {clients.map((client: ClientType) => (
          <ListItem
            key={client.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.5,
              cursor: "pointer",
            }}
            onClick={() => setSelectedClient(client)}
          >
            <span>{client.name}</span>
            <span>{client.phone}</span>
          </ListItem>
        ))}
      </List>
      {selectedClient && (
        <Modal handlerClick={() => setSelectedClient(null)}>
          <EditClientModel
            client={selectedClient}
            onEdit={(id: string, data: Partial<ClientType>) => {
              onEdit(id, data);
              setSelectedClient(null);
            }}
            onDelete={(id: string) => {
              onDelete(id);
              setSelectedClient(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
