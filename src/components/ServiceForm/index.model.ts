import type { ServiceType } from "../../model/service.model";

export type ServiceFormValues = {
  name: string;
  price: number;
  duration: number;
  categoryId: string;
};

export type ServiceFormProps = {
  mode: "create" | "edit";
  initialData?: ServiceType | null;
  onSubmit: (
    action: "create" | "edit" | "delete",
    payload?: Omit<ServiceType, "_id" | "category"> & { category: string },
    id?: string
  ) => void;
  onClose?: () => void;
};
