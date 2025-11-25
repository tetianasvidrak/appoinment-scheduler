import type { VisitType } from "../model/visit.model";
import { timeToMinutes } from "./time";

export const countOverlappingVisits = (
  visits: VisitType[],
  employeeId: string,
  time: string
) => {
  const slot = timeToMinutes(time);

  return visits.filter((v) => {
    if (v.employee._id !== employeeId) return false;

    const start = timeToMinutes(v.time);
    const end = start + v.duration;

    return slot >= start && slot < end;
  }).length;
};
