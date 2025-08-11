import { useDroppable } from "@dnd-kit/core";
import type { TimeSlotProps } from "./index.model";

export const TimeSlot = ({
  employeeId,
  time,
  occupied,
  onClick,
  children,
}: TimeSlotProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${employeeId}-${time}`,
    data: { employeeId, time },
  });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className="border-b border-b-orange-600 h-12 flex justify-start relative cursor-pointer text-xs"
      style={{
        backgroundColor: occupied ? "#e2e8f0" : isOver ? "#bee3f8" : "white",
      }}
    >
      {children}
    </div>
  );
};
