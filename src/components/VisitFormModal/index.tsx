import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { apiSlice } from "../../services/apiSlice";
import { CheckboxServices } from "../CheckboxServices";
import { ClientSearch } from "../ClientSearch";
import { CustomButton } from "../CustomButton";
import FormError from "../FormError";

import type { VisitFormModalProps } from "./index.model";
import {
  visitSchema,
  type VisitFormValues,
} from "../../validation/visitSchemas";
import { TextField } from "@mui/material";
import type { VisitFormType } from "../Scheduler/index.model";

export const VisitFormModal = ({
  mode,
  employees,
  clients,
  modal,
  onClose,
  initialData,
  onSubmit,
}: VisitFormModalProps) => {
  const { data: services } = useSelector(
    apiSlice.endpoints.getServices.select()
  );

  const defaultServices =
    initialData?.services.map(
      (s) => services?.find((full) => full._id === s._id) ?? s
    ) ?? [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitFormValues>({
    resolver: yupResolver(visitSchema),
    defaultValues: {
      client: initialData?.client || "",
      services: defaultServices,
      note: initialData?.note || "",
    },
  });

  const submitHandler = (data: VisitFormValues) => {
    const duration = data.services?.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );

    const payload: VisitFormType =
      mode === "edit"
        ? {
            mode: "edit",
            id: initialData!.id,
            services: data.services,
            client: data.client,
            note: data.note,
            employeeId: modal.employeeId,
            duration,
            time: modal.time,
          }
        : {
            mode: "create",
            services: data.services,
            client: data.client,
            note: data.note,
            employeeId: modal.employeeId,
            duration,
            time: modal.time,
          };

    onSubmit(payload);
  };

  return (
    <>
      {" "}
      <h2 className="text-xl font-bold mb-2 text-center text-[#2e6c33]">
        {mode === "edit" ? "Edit appointment" : "New appointment"}
      </h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-md flex flex-col gap-5"
      >
        <div className="flex flex-col gap-3 text-[#2e6c33] font-bold">
          <p>
            <span>Time: </span>
            {modal.time}
          </p>
          <p>
            <span>Employee: </span>
            {employees.find((e) => e._id === modal.employeeId)?.name}
          </p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Controller
            control={control}
            name="services"
            render={({ field }) => (
              <CheckboxServices
                services={services ?? []}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <FormError message={errors.services?.message} />

          <Controller
            control={control}
            name="client"
            render={({ field }) => (
              <ClientSearch
                clients={clients}
                selected={field.value}
                onChange={(client) => {
                  field.onChange(client);
                }}
              />
            )}
          />

          <FormError message={errors.client?.message} />

          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                id="outlined-multiline-flexible"
                label="Notes"
                multiline
                maxRows={4}
                onChange={field.onChange}
                value={field.value}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "15px",
                      borderColor: "#2e6c33",
                      color: "#2e6c33",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#2e6c33",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#2e6c33",
                    "&.Mui-focused": {
                      color: "#2e6c33",
                    },
                  },
                  "& .MuiButtonBase-root": {
                    color: "#2e6c33",
                    backgroundColor: "#d9efdb",
                  },
                }}
              />
            )}
          />

          <FormError message={errors.note?.message} />
        </div>
        <div className="flex justify-end gap-3 w-full">
          <CustomButton type="submit">
            {mode === "edit" ? "Save changes" : "Create appointment"}
          </CustomButton>
          <CustomButton onClick={onClose}>Cancel</CustomButton>
        </div>
      </form>
    </>
  );
};
