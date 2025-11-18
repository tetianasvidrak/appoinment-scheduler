import * as yup from "yup";
import type { ServiceType } from "../model/service.model";

export const visitSchema = yup.object({
  client: yup.string().required("Оберіть клієнта"),
  services: yup
    .array()
    .of(yup.mixed<ServiceType>().defined())
    .min(1, "Оберіть хоча б одну послугу")
    .required("Оберіть хоча б одну послугу"),
  note: yup.string().max(10, "Не більше 10 символів").default(""),
});

export type VisitFormValues = yup.InferType<typeof visitSchema>;
