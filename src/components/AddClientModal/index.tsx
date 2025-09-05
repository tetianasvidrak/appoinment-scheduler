import { v4 as uuidv4 } from "uuid";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";

import { addClientSchema } from "../../validation/clientSchemas";
import type { AddClientModelProps } from "./index.model";

type FormValues = {
  name: string;
  phone: string;
};

export const AddClientModal = ({ onAdd, onClose }: AddClientModelProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
    },
    resolver: yupResolver(addClientSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const newClient = {
      ...data,
      id: uuidv4(),
    };
    onAdd(newClient);
    onClose();
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
          <Button variant="outlined" onClick={() => onClose()}>
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
