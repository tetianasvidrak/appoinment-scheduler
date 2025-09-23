import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { apiSlice } from "../../services/apiSlice";
import { CheckboxServices } from "../CheckboxServices";
import { ClientSearch } from "../ClientSearch";
import { CustomButton } from "../CustomButton";

import type { AddVisitModalProps } from "./index.model";
import type { ClientType } from "../../model/client.model";
import {
  visitSchema,
  type VisitFormValues,
} from "../../validation/visitSchemas";

export const AddVisitModal = ({
  employees,
  modal,
  addVisit,
  clients,
  onClose,
}: AddVisitModalProps) => {
  const { data: services } = useSelector(
    apiSlice.endpoints.getServices.select()
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitFormValues>({
    resolver: yupResolver(visitSchema),
    defaultValues: {
      client: {} as ClientType,
      services: [],
      note: "",
    },
  });

  const onSubmit = (data: VisitFormValues) => {
    const duration = data.services?.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );
    addVisit(
      modal.employeeId,
      modal.time,
      duration,
      data.services,
      data.client,
      data.note
    );
  };

  return (
    <>
      {" "}
      <h2 className="text-xl font-semibold mb-2">New appointment</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-5 w-md flex flex-col items-start gap-3"
      >
        <p>Time: {modal.time}</p>
        <p>
          Employee: {employees.find((e) => e._id === modal.employeeId)?.name}
        </p>
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
        {errors.services && (
          <span className="text-red-500">{errors.services.message}</span>
        )}

        <Controller
          control={control}
          name="client"
          render={({ field }) => (
            <ClientSearch
              clients={clients}
              onChange={(client) => {
                field.onChange(client);
              }}
            />
          )}
        />
        {errors.client && (
          <span className="text-red-500">{errors.client.message}</span>
        )}

        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <label className="w-full">
              Notes:
              <textarea
                {...field}
                className="p-2 bg-pink-100 border caret-pink-500 focus:outline-pink-500 rounded resize-none w-full"
              ></textarea>
            </label>
          )}
        />
        {errors.note && (
          <span className="text-red-500">{errors.note.message}</span>
        )}
        <div className="flex justify-end gap-3">
          <CustomButton sx={{ fontSize: "16px" }} type="submit">
            Add
          </CustomButton>
          <CustomButton sx={{ fontSize: "16px" }} onClick={onClose}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </>
  );
};
