import type { ServiceType } from "../Services/index.model";

export type Category = {
  id: string;
  name: string;
};

export type AddServiceModalProps = {
  onAdd: (service: ServiceType) => void;
  onSubmit: () => void;
};
