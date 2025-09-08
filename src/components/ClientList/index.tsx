import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { EditClientModel } from "../EditClientModal";
import { Modal } from "../Modal";

import type { ClientType } from "../../model/client.model";
import type { ClientListProps } from "./index.model";

export const ClientList = ({ clients, onEdit, onDelete }: ClientListProps) => {
  const [selectedClient, setSelectedClient] = React.useState<ClientType | null>(
    null
  );
  return (
    <>
      <List>
        {clients.map((client: ClientType) => (
          <ListItem
            key={client.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 2,
              py: 0.5,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(59,130,246,0.1)",
              },
            }}
            onClick={() => setSelectedClient(client)}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: "#3b82f6" }} />
            </ListItemIcon>

            <ListItemText
              primary={client.name}
              secondary={client.phone}
              slotProps={{
                primary: {
                  sx: { fontSize: "0.95rem" },
                },
                secondary: {
                  sx: { fontSize: "0.8rem", color: "gray" },
                },
              }}
            />
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
    </>
  );
};
