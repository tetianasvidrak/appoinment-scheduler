import { useState } from "react";
import dayjs from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";

import Scheduler from "../../components/Scheduler";
import { Services } from "../../components/Services";
import { Calendar } from "../../components/Calendar";
import { Clients } from "../../components/Clients";

export const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const onChangeDateHandler = (newDate: PickerValue) => {
    if (newDate && dayjs.isDayjs(newDate)) {
      setCurrentDate(newDate);
    }
  };

  return (
    <>
      <div className="flex gap-20 p-2">
        <div className="h-screen flex flex-col gap-6">
          <Services />
          <Calendar date={currentDate} onChange={onChangeDateHandler} />
          <Clients />
        </div>
        <Scheduler date={currentDate} />
      </div>
    </>
  );
};
