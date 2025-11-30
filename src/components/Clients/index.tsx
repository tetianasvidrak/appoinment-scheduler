import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { Modal } from "../Modal";
import { ClientFormModal } from "../ClientFormModal";
import { ClientList } from "../ClientList";
import { ErrorMessage } from "../ErrorMessage";
import { SkeletonList } from "../SkeletonList";
import SearchClientBar from "../SearchClientBar";
import { CustomButton } from "../CustomButton";

import type { ClientPayload, ClientType } from "../../model/client.model";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
} from "../../services/apiSlice";
import type { ClientAction, ModalState } from "./index.model";

export const Clients = () => {
  const { data: clients = [], error, isLoading } = useGetClientsQuery();
  const [filteredClients, setFilteredClients] = useState<ClientType[]>(clients);
  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const handleClient = async (
    action: ClientAction,
    payload?: ClientPayload,
    id?: string
  ) => {
    try {
      if (action === "create" && payload) {
        await addClient(payload).unwrap();
        setModal(null);
      }

      if (action === "edit" && payload && id) {
        await updateClient({ id, data: payload }).unwrap();
        setModal(null);
      }

      if (action === "delete" && id) {
        await deleteClient(id).unwrap();
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  const searchClient = (input: string) => {
    setFilteredClients(
      clients.filter(
        (client) =>
          client.name.toLowerCase().includes(input.toLowerCase()) ||
          client.phone.includes(input)
      )
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h6">Clients</Typography>
            <p className="text-sm">Total clients: {clients?.length}</p>
          </div>
          <CustomButton
            disabled={!!error}
            sx={{ fontSize: "16px" }}
            onClick={() => setModal({ type: "create" })}
          >
            Add new
          </CustomButton>
        </div>
        <SearchClientBar
          onSearch={(input: string) => searchClient(input)}
          disabled={isLoading || !!error}
        />
        {isLoading ? (
          <SkeletonList />
        ) : error ? (
          <ErrorMessage message="Failed to load data...">
            <ErrorOutline fontSize="large" />
          </ErrorMessage>
        ) : (
          <ClientList
            mode="edit"
            clients={filteredClients}
            onSubmit={(action, payload, id) =>
              handleClient(action, payload, id)
            }
          />
        )}
      </div>
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <ClientFormModal
            mode="create"
            onSubmit={(action, payload) => handleClient(action, payload)}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </>
  );
};
