import * as yup from "yup";
import type { ServiceType } from "../model/service.model";
import type { ClientType } from "../model/client.model";

export const visitSchema = yup.object({
  client: yup.mixed<ClientType>().required("Оберіть клієнта"),
  services: yup
    .array()
    .of(yup.mixed<ServiceType>().defined())
    .min(1, "Оберіть хоча б одну послугу")
    .required("Оберіть хоча б одну послугу"),
  note: yup.string().max(300, "Не більше 300 символів").default(""),
});

export type VisitFormValues = yup.InferType<typeof visitSchema>;
