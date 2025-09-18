import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { Modal } from "../Modal";
import { AddClientModal } from "../AddClientModal";
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

export const Clients = () => {
  const [modal, setModal] = React.useState(false);

  const { data: clients = [], error, isLoading } = useGetClientsQuery();
  const [filteredClients, setFilteredClients] = useState<ClientType[]>(clients);
  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const handleAddClient = async (client: ClientPayload) => {
    try {
      await addClient(client).unwrap();
    } catch (err) {
      console.error("Failed to add client:", err);
    }
  };

  const handleUpdateClient = async (id: string, data: ClientPayload) => {
    try {
      await updateClient({
        id,
        data,
      }).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      const deleted = await deleteClient(id).unwrap();
      console.log("Deleted client:", deleted);
    } catch (err) {
      console.error("Delete failed", err);
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
            onClick={() => setModal(true)}
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
            clients={filteredClients}
            onEdit={handleUpdateClient}
            onDelete={handleDeleteClient}
          />
        )}
      </div>
      {modal && (
        <Modal handlerClick={() => setModal(false)}>
          <AddClientModal
            onAdd={(client) => {
              handleAddClient(client);
            }}
            onClose={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
