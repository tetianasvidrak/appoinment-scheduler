import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";

import { Modal } from "../Modal";
import { CustomButton } from "../CustomButton";

import type { EditClientModalProps } from "./index.model";
import { editClientSchema } from "../../validation/clientSchemas";

type FormValues = {
  name: string;
  phone: string;
};

export const EditClientModel = ({
  client,
  onEdit,
  onDelete,
}: EditClientModalProps) => {
  const [modalDelete, setModalDelete] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: client?.name ?? "",
      phone: client?.phone ?? "",
    },
    resolver: yupResolver(editClientSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onEdit(client._id, {
      ...data,
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 flex flex-col gap-1 my-4"
      >
        <div className="flex gap-2">
          <label className="block font-medium">Full name:</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message || " "}
                value={field.value || ""}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
                slotProps={{
                  formHelperText: {
                    sx: { minHeight: "20px" },
                  },
                }}
              />
            )}
          />
        </div>

        <div className="flex gap-2">
          <label className="block font-medium">Phone:</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                error={!!errors.phone}
                helperText={errors.phone?.message || " "}
                value={field.value || ""}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
                slotProps={{
                  formHelperText: {
                    sx: { minHeight: "20px" },
                  },
                }}
              />
            )}
          />
        </div>
        <div className="flex justify-end gap-3">
          <CustomButton
            sx={{ fontSize: "16px" }}
            onClick={() => setModalDelete(true)}
          >
            Delete
          </CustomButton>

          <CustomButton type="submit" sx={{ fontSize: "16px" }}>
            Save
          </CustomButton>
        </div>
      </form>
      {modalDelete && (
        <Modal handlerClick={() => setModalDelete(false)}>
          <div className="flex flex-col items-center gap-6 p-4">
            <p>Are you sure you want to delete this client?</p>
            <div className="flex gap-4">
              <CustomButton
                sx={{ fontSize: "16px" }}
                onClick={() => setModalDelete(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton
                sx={{ fontSize: "16px" }}
                onClick={() => {
                  onDelete(client._id);
                }}
              >
                Delete
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
