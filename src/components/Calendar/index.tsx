import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import type { CalendarProps } from "./index.model";

import "dayjs/locale/en-gb";

export const Calendar = ({ date, onChange }: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DateCalendar
        value={date}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue);
          }
        }}
        sx={{
          "& .MuiDayCalendar-header": {
            justifyContent: "space-between",
          },
          "& .MuiDayCalendar-weekContainer": {
            justifyContent: "space-between",
          },
          "& .MuiPickersCalendarHeader-root": {
            padding: 0,
          },
          "& .MuiPickersCalendarHeader-label": {
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#2e6c33",
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: "#2e6c33",
            "&:hover": {
              backgroundColor: "rgba(34,197,94,0.1)",
            },
          },
          "& .MuiPickersDay-root": {
            border: "1px solid transparent",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "rgba(34,197,94,0.15)",
            },
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#2e6c33",
            color: "#fff",
          },
          "& .MuiPickersDay-today": {
            borderColor: "red",
          },
          "& .MuiPickersDay-today.Mui-selected": {
            color: "white",
            borderColor: "red",
            "&:hover": {
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#000",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
