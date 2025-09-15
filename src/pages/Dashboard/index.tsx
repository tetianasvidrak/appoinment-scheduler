import { useState } from "react";
import { Calendar } from "../../components/Calendar";
import Scheduler from "../../components/Scheduler";
import { Services } from "../../components/Services";
import dayjs, { Dayjs } from "dayjs";
import { Clients } from "../../components/Clients";

export const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const onChangeDateHandler = (newDate: Dayjs | null) => {
    setCurrentDate(newDate || dayjs());
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
