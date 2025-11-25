import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, TextField } from "@mui/material";

import type { ServiceFormModalProps } from "./index.model.ts";
import { addServiceSchema } from "../../validation/serviceSchemas.ts";
import { useGetCategoriesQuery } from "../../services/apiSlice.ts";
import { CustomButton } from "../CustomButton/index.tsx";
import type { ServicePayload } from "../../model/service.model.ts";

type FormValues = {
  name: string;
  price: number;
  duration: number;
  categoryId: string;
};

export const ServiceFormModal = ({
  mode,
  initialData,
  durationOptions,
  onClose = () => {},
  onSubmit,
}: ServiceFormModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addServiceSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      duration: initialData?.duration || durationOptions[0].value,
      categoryId: initialData?.category._id || "",
    },
  });
  const { data: categories } = useGetCategoriesQuery();

  const submitHandler = (data: FormValues) => {
    const payload: ServicePayload = {
      name: data.name,
      category: data.categoryId,
      price: data.price,
      duration: data.duration,
    };

    if (mode === "create") onSubmit("create", payload);
    if (mode === "edit") onSubmit("edit", payload, initialData!._id);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2 text-center text-[#2e6c33]">
        {mode === "edit" ? "Edit service" : "New service"}
      </h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-96 flex flex-col gap-1 mx-5 my-10 "
      >
        <div className="flex">
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
                helperText={errors.categoryId?.message || " "}
                value={field.value || ""}
                className="self-center"
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
                  formHelperText: {
                    sx: { minHeight: "20px" },
                  },
                }}
              >
                {categories?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div className="flex gap-2">
          <label className="block font-medium">Service:</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message || " "}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
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
                helperText={errors.duration?.message || " "}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
                slotProps={{
                  select: { MenuProps: { disableScrollLock: true } },
                  formHelperText: {
                    sx: { minHeight: "20px" },
                  },
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

        <div className="flex gap-2">
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
                helperText={errors.price?.message || " "}
                sx={{
                  width: "70%",
                  marginLeft: "auto",
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
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

        <div className="flex justify-end gap-3 absolute bottom-6 right-4 w-full">
          {mode === "create" && (
            <CustomButton onClick={() => onClose()}>Cancel</CustomButton>
          )}
          {mode === "edit" && (
            <CustomButton
              onClick={() => {
                onSubmit("delete", undefined, initialData?._id);
                onClose();
              }}
            >
              Delete
            </CustomButton>
          )}
          <CustomButton type="submit">Save</CustomButton>
        </div>
      </form>
    </>
  );
};
