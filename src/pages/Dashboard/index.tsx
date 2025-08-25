import { useState } from "react";
import { Calendar } from "../../components/Calendar";
import Scheduler from "../../components/Scheduler";
import { Services } from "../../components/Services";
import dayjs, { Dayjs } from "dayjs";

export const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const onChangeDateHandler = (newDate: Dayjs | null) => {
    setCurrentDate(newDate || dayjs());
  };

  return (
    <>
      <div className="flex gap-20 p-2">
        <div>
          <Services />
          <Calendar date={currentDate} onChange={onChangeDateHandler} />
        </div>
        <Scheduler />
      </div>
    </>
  );
};
