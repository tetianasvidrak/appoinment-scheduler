import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import type { CalendarProps } from "./index.model";

export const Calendar = ({ date, onChange }: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateCalendar", "DateCalendar"]}
        sx={{
          flexShrink: 0,
        }}
      >
        <DateCalendar
          value={date || dayjs()}
          onChange={(newValue) => onChange(newValue)}
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
              color: "#3b82f6",
              "&:hover": {
                backgroundColor: "rgba(59,130,246,0.1)",
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
