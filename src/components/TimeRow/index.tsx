import React from "react";
import type { TimeRowProps } from "./index.model";

export const TimeRow = ({
  employees,
  time,
  visits,
  onModalOpen,
}: TimeRowProps) => {
  return (
    <React.Fragment key={time}>
      <div className="text-right pr-2 text-sm text-gray-500">{time}</div>
      {employees.map((e) => (
        <TimeSlot
          key={e._id}
          visits={visits}
          employeeId={e._id}
          time={time}
          occupied={checkSlotOccupation(visits, e._id, time)}
          onClick={() => {
            setModal({ type: "create", employeeId: e._id, time });
          }}
        >
          {visits
            .filter((v) => {
              return v.employee._id === e._id && v.time === time;
            })
            .map((v) => (
              <Visit
                key={v._id}
                visit={v}
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({
                    type: "edit",
                    employeeId: v.employee._id,
                    time: v.time,
                    visit: v,
                  });
                }}
              />
            ))}
        </TimeSlot>
      ))}
    </React.Fragment>
  );
};
