import React from "react";
import { Typography, Button } from "@mui/material";

import { AddServiceModal } from "../AddServiceModal";
import { Modal } from "../Modal";
import { ServiceList } from "../ServiceList";

import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export const Services = () => {
  const [modal, setModal] = React.useState(false);
  const [services, setServices] = React.useState<ServiceType[]>([
    {
      id: "semi-permanente",
      categoryId: "1",
      name: "semi-permanente",
      duration: 30,
      price: "200",
    },
  ]);
  const durationOptions: DurationOption[] = [
    { label: "0:30", value: 30 },
    { label: "1:00", value: 60 },
    { label: "1:30", value: 90 },
    { label: "2:00", value: 120 },
    { label: "2:30", value: 150 },
    { label: "3:00", value: 180 },
  ];

  const addService = (service: ServiceType) => {
    setServices([...services, service]);
  };

  const editService = (id: string, data: Partial<ServiceType>) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, ...data } : service
      )
    );
  };

  const deleteService = (id: string) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
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
            durationOptions={durationOptions}
            onAdd={addService}
            onSubmit={() => setModal(false)}
          />
        </Modal>
      )}
      <ServiceList
        services={services}
        durationOptions={durationOptions}
        onEdit={editService}
        onDelete={deleteService}
      />
    </>
  );
};
