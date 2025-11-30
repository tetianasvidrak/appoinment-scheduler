import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import type { CalendarProps } from "./index.model";

export const Calendar = ({ date, onChange }: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        onChange={(newValue) => {
          if (newValue) {
            onChange(newValue);
          }
        }}
        sx={{
          "& .MuiDateCalendar-root": {
            display: "flex",
            flexShrink: 0,
            width: "100%",
            justifyContent: "space-around",
            px: 1,
          },
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiPickersCalendarHeader-label": {
            fontSize: "1.2rem",
            fontWeight: 500,
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: "#2e6c33",
            "&:hover": {
              backgroundColor: "rgba(34,197,94,0.1)",
            },
          },
          "& .MuiPickersDay-root": {
            border: "none",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "rgba(34,197,94,0.15)",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "rgba(34,197,94,0.15) !important",
              outline: "none",
            },
            "&:focus": {
              outline: "none",
              backgroundColor: "rgba(34,197,94,0.15) !important",
            },
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "rgba(34,197,94,0.15)",
            color: "#000",
            border: "1px solid #2e6c33",
          },
          "& .MuiPickersDay-today": {
            backgroundColor: "#2e6c33",
            color: "white",
          },
          "& .MuiPickersDay-today:hover": {
            backgroundColor: "#2e6c33 !important",
          },
          "& .MuiPickersDay-today.Mui-selected": {
            backgroundColor: "#2e6c33 !important",
            color: "white !important",
            border: "none",
            "&:hover": {
              backgroundColor: "#2e6c33 !important",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
