import type { ServicePayload } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type AddServiceModalProps = {
  durationOptions: DurationOption[];
  onAdd: (service: ServicePayload) => void;
  onCloseModal: () => void;
};
