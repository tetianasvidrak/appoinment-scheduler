import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { Button, MenuItem, TextField } from "@mui/material";

import type { AddServiceModalProps } from "./index.model.ts";
import { categories } from "../../data/categories.ts";
import { addServiceSchema } from "../../validation/serviceSchemas.ts";

type FormValues = {
  name: string;
  price: number;
  duration: number;
  categoryId: string;
};

export const AddServiceModal = ({
  durationOptions,
  onAdd,
  onCloseModal,
}: AddServiceModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: 0,
      duration: durationOptions[0].value,
      categoryId: "",
    },
    resolver: yupResolver(addServiceSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newService = {
      ...data,
      id: uuidv4(),
    };
    onAdd(newService);
    onCloseModal();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 flex flex-col gap-1 my-4"
      >
        <div className="flex gap-2">
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
                  <MenuItem key={option.id} value={option.id}>
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

        <div className="flex justify-end gap-3">
          <Button variant="outlined" onClick={() => onCloseModal()}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
