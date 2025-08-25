import type { ServiceType } from "../../model/service.model";

export type AddServiceModalProps = {
  durationOptions: string[];
  onAdd: (service: ServiceType) => void;
  onSubmit: () => void;
};
