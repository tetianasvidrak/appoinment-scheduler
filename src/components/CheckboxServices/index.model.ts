import type { ServiceType } from "../../model/service.model";

export type CheckboxServicesProps = {
  selected: ServiceType[];
  onChange: (newServices: ServiceType[]) => void;
};
