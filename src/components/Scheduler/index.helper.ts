import { timeToMinutes } from "../../helpers/time";
import type { VisitType } from "../../model/visit.model";

export const isSlotOccupied = (
  visits: VisitType[],
  employeeId: string,
  time: string
) => {
  const slotMinutes = timeToMinutes(time);
  return visits.some((v) => {
    if (v.employee._id !== employeeId) return false;
    const visitStart = timeToMinutes(v.time);
    const visitEnd = visitStart + v.duration;
    return slotMinutes >= visitStart && slotMinutes < visitEnd;
  });
};
