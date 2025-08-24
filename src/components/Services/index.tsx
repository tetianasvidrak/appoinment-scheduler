import React from "react";
import { Typography, Button } from "@mui/material";

import { AddServiceModal } from "../AddServiceModal";
import { Modal } from "../Modal";
import { ServiceList } from "../ServiceList";

import type { ServiceType } from "../../model/service.model";

export const Services = () => {
  const [modal, setModal] = React.useState(false);
  const [services, setServices] = React.useState<ServiceType[]>([]);

  const addService = (service: ServiceType) => {
    setServices([...services, service]);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Services
        </Typography>
        <Button
          variant="outlined"
          sx={{ padding: "3px 10px 3px 10px" }}
          onClick={() => setModal(true)}
        >
          ADD NEW
        </Button>
      </div>
      {modal && (
        <Modal handlerClick={() => setModal(false)}>
          <AddServiceModal
            onAdd={addService}
            onSubmit={() => setModal(false)}
          />
        </Modal>
      )}
      <ServiceList services={services} />
    </>
  );
};
