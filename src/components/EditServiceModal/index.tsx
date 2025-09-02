import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@mui/material";

import { Modal } from "../Modal";

import type { EditServiceModalProps } from "./index.model";
import { editServiceSchema } from "../../validation/serviceSchemas";

type FormValues = {
  name: string;
  price: number;
  duration: number;
  categoryId: string;
};

export const EditServiceModal = ({
  service,
  durationOptions,
  categories,
  onEdit,
  onDelete,
}: EditServiceModalProps) => {
  const [modalDelete, setModalDelete] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: service?.name ?? "",
      price: service?.price ?? "",
      duration: service?.duration ?? "",
      categoryId: service?.categoryId ?? "",
    },
    resolver: yupResolver(editServiceSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onEdit(service.id, {
      ...data,
      duration: Number(data.duration),
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 flex flex-col gap-4 my-4"
      >
        <div className="flex items-center gap-2">
          <label className="block font-medium">Category:</label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                {...field}
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
                value={field.value || ""}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
                slotProps={{
                  select: {
                    MenuProps: {
                      disableScrollLock: true,
                      PaperProps: { sx: { maxHeight: 200, overflowY: "auto" } },
                    },
                  },
                }}
              >
                {categories?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Service:</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Duration:</label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                {...field}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
                slotProps={{
                  select: { MenuProps: { disableScrollLock: true } },
                }}
              >
                {durationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="block font-medium">Price (€):</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                type="text"
                {...field}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="outlined" onClick={() => setModalDelete(true)}>
            Delete
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>

      {modalDelete && (
        <Modal handlerClick={() => setModalDelete(false)}>
          <div className="flex flex-col items-center gap-6 p-4">
            <p>Are you sure you want to delete this service?</p>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                onClick={() => {
                  setModalDelete(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  onDelete(service.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
