import type { PickerValidDate } from "@mui/x-date-pickers/models";

export type CalendarProps = {
  date: PickerValidDate;
  onChange: (newDate: PickerValidDate) => void;
};
