import type { ServiceType } from "../../model/service.model";
import type { DurationOption } from "../../model/duration.model";

export type ServiceFormModalProps = {
  mode: "create" | "edit";
  initialData?: ServiceType | null;
  durationOptions: DurationOption[];
  onSubmit: (
    action: "create" | "edit" | "delete",
    payload?: Omit<ServiceType, "_id" | "category"> & { category: string },
    id?: string
  ) => void;
  onClose?: () => void;
};
