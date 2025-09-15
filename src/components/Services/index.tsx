import React from "react";
import { Typography, Button } from "@mui/material";

import { AddServiceModal } from "../AddServiceModal";
import { Modal } from "../Modal";
import { ServiceList } from "../ServiceList";

import type { ServiceType } from "../../model/service.model";
import { durationOptions } from "../../constants/durationOptions";

export const Services = () => {
  const [modal, setModal] = React.useState(false);
  const [services, setServices] = React.useState<ServiceType[]>([
    {
      id: "semi-permanente",
      categoryId: "1",
      name: "semi-permanente",
      duration: 30,
      price: 30,
    },
  ]);

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
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between ">
          <Typography variant="h6">Services</Typography>
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
        <ServiceList
          services={services}
          durationOptions={durationOptions}
          onEdit={editService}
          onDelete={deleteService}
        />
      </div>
      {modal && (
        <Modal handlerClick={() => setModal(false)}>
          <AddServiceModal
            durationOptions={durationOptions}
            onAdd={addService}
            onCloseModal={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
