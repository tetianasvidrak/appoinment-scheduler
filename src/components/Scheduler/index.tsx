import React, { useState } from "react";
import type { VisitModel } from "./index.model";
import type { Employee } from "./index.model";
import { DndContext, pointerWithin, type DragEndEvent } from "@dnd-kit/core";
import { TimeSlot } from "../TimeSlot";
import { Visit } from "../Visit";

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

const times = Array.from({ length: 40 }, (_, i) => {
  const hours = Math.floor((9 * 60 + i * 15) / 60);
  const minutes = (9 * 60 + i * 15) % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
});

const employees: Employee[] = [
  { id: "emp-1", name: "Іван" },
  { id: "emp-2", name: "Олег" },
  { id: "emp-3", name: "Марія" },
];

export default function Welcome() {
  const [visits, setVisits] = useState<VisitModel[]>([
    { id: "v1", employeeId: "emp-1", time: "09:00", duration: 30 },
    { id: "v2", employeeId: "emp-1", time: "11:00", duration: 45 },
    { id: "v3", employeeId: "emp-2", time: "10:00", duration: 60 },
    { id: "v4", employeeId: "emp-3", time: "14:30", duration: 15 },
  ]);

  const isSlotOccupied = (employeeId: string, time: string) => {
    const slotMinutes = toMinutes(time);
    return visits.some((v) => {
      if (v.employeeId !== employeeId) return false;
      const visitStart = toMinutes(v.time);
      const visitEnd = visitStart + v.duration;
      return slotMinutes >= visitStart && slotMinutes < visitEnd;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("FIRST");
    const { active, over } = event;
    if (!over) return;
    console.log("SECOND", over);

    const visitId = active.id;
    const target = over.data.current;
    if (!target) return;
    console.log("THIRD");

    const { employeeId, time } = target;
    console.log(target);
    const movedVisit = visits.find((v) => v.id === visitId);
    if (!movedVisit) return;
    console.log("FORTH");

    // Check for overlap except for the dragged visit itself
    const durationSlots = movedVisit.duration / 15;

    console.log("durationSlots", durationSlots);
    if (
      [...Array(durationSlots).keys()].some((i) => {
        const slotTime = minutesToTime(toMinutes(time) + i * 15);
        console.log("slotTime", slotTime);
        return visits.some(
          (v) =>
            v.id !== movedVisit.id &&
            v.employeeId === employeeId &&
            toMinutes(slotTime) >= toMinutes(v.time) &&
            toMinutes(slotTime) < toMinutes(v.time) + v.duration
        );
      })
    )
      return;
    console.log("FIFTH");

    setVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, employeeId, time } : v))
    );
  };

  const handlerClick = () => {};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Календар працівників</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <div className="grid grid-cols-4">
          <div></div>
          {employees.map((e) => (
            <div key={e.id} className="text-center font-semibold text-lg">
              {e.name}
            </div>
          ))}
          {times.map((time) => (
            <React.Fragment key={time}>
              <div className="text-right pr-2 text-sm text-gray-500 border-b-orange-500">
                {time}
              </div>
              {employees.map((e) => (
                <TimeSlot
                  key={e.id + time}
                  employeeId={e.id}
                  time={time}
                  occupied={isSlotOccupied(e.id, time)}
                  onClick={handlerClick}
                >
                  {visits
                    .filter((v) => {
                      return v.employeeId === e.id && v.time === time;
                    })
                    .map((v) => (
                      <Visit key={v.id} visit={v} onClick={handlerClick} />
                    ))}
                </TimeSlot>
              ))}
            </React.Fragment>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
