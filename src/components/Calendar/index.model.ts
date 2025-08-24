import { Dayjs } from "dayjs";

export type CalendarProps = {
  date?: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
};
