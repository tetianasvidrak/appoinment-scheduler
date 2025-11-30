import type { VisitType } from "../../model/visit.model";
import { minutesToTime, timeToMinutes } from "../../helpers/time";

export const countOverlappingVisits = (
  employeeVisits: VisitType[],
  time: string
) => {
  const slot = timeToMinutes(time);

  return employeeVisits.filter((v) => {
    const start = timeToMinutes(v.time);
    const end = start + v.duration;

    return slot >= start && slot < end;
  }).length;
};

export const checkSlotOccupation = (
  currentVisit: VisitType,
  employeeVisits: VisitType[],
  time: string
) => {
  const durationSlots = currentVisit.duration / 15;

  const isSlotOccupied = [...Array(durationSlots).keys()].some((i) => {
    const slotTime = minutesToTime(timeToMinutes(time) + i * 15);

    const overlapCount = countOverlappingVisits(employeeVisits, slotTime);

    return overlapCount >= 2;
  });

  return isSlotOccupied;
};
