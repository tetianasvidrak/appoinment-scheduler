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
import AddIcon from "@mui/icons-material/Add";

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
        setModal(null);
      }

      if (action === "edit" && payload && id) {
        await updateService({ id, data: payload }).unwrap();
        setModal(null);
      }

      if (action === "delete" && id) {
        await deleteService(id).unwrap();
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#949494] pb-3">
          <Typography
            variant="h6"
            sx={{ color: "#2e6c33", fontWeight: "bold" }}
          >
            Services
          </Typography>

          <CustomButton
            disabled={!!errorCategories}
            round
            sx={{ height: 42, width: 42 }}
            onClick={() => setModal({ type: "create" })}
          >
            <AddIcon fontSize="medium" />
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
