import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { EditClientModel } from "../EditClientModal";
import { Modal } from "../Modal";
import { CustomButton } from "../CustomButton";

import type { ClientPayload, ClientType } from "../../model/client.model";
import type { ClientListProps } from "./index.model";

type ClientModalState = {
  type: "edit" | "delete";
  client: ClientType;
} | null;

export const ClientList = ({ clients, onEdit, onDelete }: ClientListProps) => {
  const [modalState, setModalState] = React.useState<ClientModalState>(null);
  return (
    <>
      <List
        className="scroll-thin"
        sx={{
          maxHeight: 220,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {clients.map((client: ClientType) => (
          <ListItem
            key={client._id}
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
            onClick={() => setModalState({ type: "edit", client })}
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

            <IconButton
              size="small"
              edge="end"
              aria-label="delete"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#ef4444",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setModalState({ type: "delete", client });
              }}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {modalState && modalState.type === "delete" && (
        <Modal handlerClick={() => setModalState(null)}>
          <div className="flex flex-col items-center gap-6 p-4">
            <p>Are you sure you want to delete this client?</p>
            <div className="flex gap-4">
              <CustomButton
                sx={{ fontSize: "16px" }}
                onClick={() => setModalState(null)}
              >
                Cancel
              </CustomButton>
              <CustomButton
                sx={{ fontSize: "16px" }}
                onClick={() => {
                  onDelete(modalState.client._id);
                  setModalState(null);
                }}
              >
                Delete
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
      {modalState && modalState.type === "edit" && (
        <Modal handlerClick={() => setModalState(null)}>
          <EditClientModel
            client={modalState.client}
            onEdit={(id: string, data: ClientPayload) => {
              onEdit(id, data);
              setModalState(null);
            }}
            onDelete={(id: string) => {
              onDelete(id);
              setModalState(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};
