import { useDroppable } from "@dnd-kit/core";
import type { TimeSlotProps } from "./index.model";
import { minutesToTime, timeToMinutes } from "../../helpers/time";

export const TimeSlot = ({
  employeeId,
  visits,
  time,
  onClick,
  children,
}: TimeSlotProps) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `${employeeId}-${time}`,
    data: { employeeId, time },
  });

  const occupied =
    visits.filter((v) => {
      if (v.employee._id !== employeeId || active?.id === v._id) return false;
      const start = v.time;
      const end = minutesToTime(timeToMinutes(v.time) + v.duration);
      return (
        timeToMinutes(time) >= timeToMinutes(start) &&
        timeToMinutes(time) < timeToMinutes(end)
      );
    }).length >= 2;

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className="border-b border-b-[#949494] h-10 flex justify-start relative cursor-pointer text-xs gap-0.5"
      style={{
        backgroundColor:
          isOver && occupied ? "red" : isOver ? "#bee3f8" : "white",
      }}
    >
      {children}
    </div>
  );
};
