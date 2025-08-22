import { Dayjs } from "dayjs";

export type CalendatType = {
  date?: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
};
