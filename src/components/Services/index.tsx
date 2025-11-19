import { useState } from "react";
import { Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { CustomButton } from "../CustomButton";
import { ErrorMessage } from "../ErrorMessage";
import { Modal } from "../Modal";
import { ServiceFormModal } from "../ServiceFormModal";
import { ServiceList } from "../ServiceList";
import { SkeletonList } from "../SkeletonList";

import type { ServicePayload } from "../../model/service.model";
import { durationOptions } from "../../constants/durationOptions";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetCategoriesQuery,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "../../services/apiSlice";
import type { ModalState, ServiceAction } from "./index.model";

export const Services = () => {
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
  const [modal, setModal] = useState<ModalState | null>(null);

  const handleService = async (
    action: ServiceAction,
    payload?: ServicePayload,
    id?: string
  ) => {
    try {
      if (action === "create" && payload) {
        await addService(payload).unwrap();
        console.log("Service added");
        setModal(null);
      }

      if (action === "edit" && payload && id) {
        await updateService({ id, data: payload }).unwrap();
        console.log("Service updated");
        setModal(null);
      }

      if (action === "delete" && id) {
        const deleted = await deleteService(id).unwrap();
        console.log("Deleted:", deleted);
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
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
            onClick={() => setModal({ type: "create" })}
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
            mode="edit"
            categories={categories ?? []}
            services={services ?? []}
            durationOptions={durationOptions}
            onSubmit={(action, payload, id) =>
              handleService(action, payload, id)
            }
          />
        )}
      </div>
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <ServiceFormModal
            mode="create"
            durationOptions={durationOptions}
            onSubmit={(action, payload) => handleService(action, payload)}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </>
  );
};
