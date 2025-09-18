import React from "react";
import { Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { AddServiceModal } from "../AddServiceModal";
import { Modal } from "../Modal";
import { ServiceList } from "../ServiceList";
import { CustomButton } from "../CustomButton";
import { SkeletonList } from "../SkeletonList";
import { ErrorMessage } from "../ErrorMessage";

import type { ServicePayload } from "../../model/service.model";
import { durationOptions } from "../../constants/durationOptions";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetCategoriesQuery,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../services/apiSlice";

export const Services = () => {
  const [modal, setModal] = React.useState(false);
  const {
    data: categories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();
  const {
    data: services,
    error: errorServices,
    isLoading: isLoadingServices,
  } = useGetServicesQuery();
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const isLoading = isLoadingCategories || isLoadingServices;
  const error = errorCategories || errorServices;

  const handleAddService = async (data: ServicePayload) => {
    try {
      await addService(data).unwrap();
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

          <CustomButton
            disabled={!!errorCategories}
            sx={{ fontSize: "16px" }}
            onClick={() => setModal(true)}
          >
            Add new
          </CustomButton>
        </div>
        {isLoading ? (
          <SkeletonList />
        ) : error ? (
          <ErrorMessage message="Failed to load data...">
            <ErrorOutline fontSize="large" />
          </ErrorMessage>
        ) : (
          <ServiceList
            categories={categories ?? []}
            services={services ?? []}
            durationOptions={durationOptions}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        )}
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
