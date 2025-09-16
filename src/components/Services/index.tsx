import React from "react";
import { Typography, Button } from "@mui/material";

import { AddServiceModal } from "../AddServiceModal";
import { Modal } from "../Modal";
import { ServiceList } from "../ServiceList";

import type { ServicePayload } from "../../model/service.model";
import { durationOptions } from "../../constants/durationOptions";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../services/apiSlice";
import { Loader } from "../Loader";

export const Services = () => {
  const [modal, setModal] = React.useState(false);
  const { data: services, error, isLoading } = useGetServicesQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const handleAddService = async (data: ServicePayload) => {
    try {
      await addService(data).unwrap();
      console.log("Service added!");
      setModal(false);
    } catch (err) {
      console.error("Failed to add service:", err);
    }
  };

  const handleEditService = async (id: string, data: ServicePayload) => {
    try {
      await updateService({
        id,
        data,
      }).unwrap();
      console.log("Service updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const deleted = await deleteService(id).unwrap();
      console.log("Deleted service:", deleted);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#949494] pb-3">
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
            Add new
          </Button>
        </div>
        {error && <p>Error occured...</p>}
        {isLoading && <Loader imageSrc="loading" />}
        <ServiceList
          services={services ?? []}
          durationOptions={durationOptions}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
        />
      </div>
      {modal && (
        <Modal handlerClick={() => setModal(false)}>
          <AddServiceModal
            durationOptions={durationOptions}
            onAdd={handleAddService}
            onCloseModal={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
