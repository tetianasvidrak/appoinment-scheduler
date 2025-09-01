import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type AddServiceModalProps = {
  durationOptions: DurationOption[];
  onAdd: (service: ServiceType) => void;
  onSubmit: () => void;
};
