import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { Modal } from "../Modal";
import { AddClientModal } from "../AddClientModal";
import { ClientList } from "../ClientList";

import type { ClientType } from "../../model/client.model";
import SearchClientBar from "../SearchClientBar";

export const Clients = () => {
  const [modal, setModal] = React.useState(false);
  const [clients, setClients] = useState<ClientType[]>([
    {
      id: "1",
      name: "Tetiana",
      phone: "1234567",
    },
    { id: "2", name: "NAtali", phone: "234" },
  ]);
  const [filteredClients, setFilteredClients] = useState<ClientType[]>(clients);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const addClient = (client: ClientType) => {
    setClients((prev) => [...prev, client]);
  };

  const editClient = (id: string, data: Partial<ClientType>) => {
    setClients((prev) =>
      prev.map((client) => (client.id === id ? { ...client, ...data } : client))
    );
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
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
            <Typography variant="h6" gutterBottom>
              Clients
            </Typography>
            <p className="text-sm">Total clients: {clients.length}</p>
          </div>
          <Button
            variant="outlined"
            sx={{
              padding: "5px 12px",
              color: "#949494",
              lineHeight: 1.5,
              borderColor: "#949494",
              borderRadius: "20px",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#949494",
                color: "#fff",
                borderColor: "#949494",
              },
            }}
            onClick={() => setModal(true)}
          >
            ADD NEW
          </Button>
        </div>
        <SearchClientBar onSearch={(input: string) => searchClient(input)} />
        <ClientList
          clients={filteredClients}
          onEdit={editClient}
          onDelete={deleteClient}
        />
      </div>
      {modal && (
        <Modal handlerClick={() => setModal(false)}>
          <AddClientModal
            onAdd={(client) => {
              addClient(client);
            }}
            onClose={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
