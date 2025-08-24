import type { ServiceType } from "../../model/service.model";

export type AddServiceModalProps = {
  onAdd: (service: ServiceType) => void;
  onSubmit: () => void;
};
