import type { ServiceType } from "../../model/service.model";

export type CheckboxServicesProps = {
  services: ServiceType[];
  selected: ServiceType[];
  onChange: (newServices: ServiceType[]) => void;
};
