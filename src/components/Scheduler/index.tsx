import React, { useState } from "react";
import dayjs from "dayjs";
import { DndContext, pointerWithin, type DragEndEvent } from "@dnd-kit/core";

import {
  timeToMinutes,
  minutesToTime,
  generate15MinTimeSlots,
} from "../../helpers/time";
import { isSlotOccupied } from "./index.helper";

import { AddVisitModal } from "../AddVisitModal";
import { EditVisitModal } from "../EditVisitModal";
import { Modal } from "../Modal";
import { TimeSlot } from "../TimeSlot";
import { Visit } from "../Visit";

import type { EmployeeType } from "../../model/employee.model";
import type { AddVisitModalState } from "../AddVisitModal/index.model";
import type { EditVisitModalState } from "../EditVisitModal/index.model";
import type { ModalState } from "../Modal/index.model";
import type { VisitType } from "../../model/Visit.model";

const employees: EmployeeType[] = [
  { id: "emp-1", name: "Svitlana" },
  { id: "emp-2", name: "Oksana" },
  { id: "emp-3", name: "Alina" },
];

export default function Scheduler() {
  const [currentDate] = useState(dayjs());
  const [modal, setModal] = useState<ModalState | null>(null);
  const [duration, setDuration] = useState<number>(15);
  const [visits, setVisits] = useState<VisitType[]>([
    { id: "v1", employeeId: "emp-1", time: "09:00", duration: 30 },
    { id: "v2", employeeId: "emp-1", time: "11:00", duration: 45 },
    { id: "v3", employeeId: "emp-2", time: "10:00", duration: 60 },
    { id: "v4", employeeId: "emp-3", time: "14:30", duration: 15 },
  ]);
  const times = generate15MinTimeSlots();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const visitId = active.id;
    const target = over.data.current;
    if (!target) return;

    const { employeeId, time } = target;
    const movedVisit = visits.find((v) => v.id === visitId);
    if (!movedVisit) return;

    const durationSlots = movedVisit.duration / 15;

    if (
      [...Array(durationSlots).keys()].some((i) => {
        const slotTime = minutesToTime(timeToMinutes(time) + i * 15);
        return visits.some(
          (v) =>
            v.id !== movedVisit.id &&
            v.employeeId === employeeId &&
            timeToMinutes(slotTime) >= timeToMinutes(v.time) &&
            timeToMinutes(slotTime) < timeToMinutes(v.time) + v.duration
        );
      })
    )
      return;

    setVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, employeeId, time } : v))
    );
  };

  const addVisit = (employeeId: string, time: string, duration: number) => {
    if (!duration || duration < 15 || duration % 15 !== 0) {
      alert("Тривалість має бути кратною 15 і не менше 15 хвилин");
      return;
    }
    const visitSlots = duration / 15;
    if (
      [...Array(visitSlots).keys()].some((i) =>
        isSlotOccupied(
          visits,
          employeeId,
          minutesToTime(timeToMinutes(time) + i * 15)
        )
      )
    ) {
      alert("Слот зайнятий");
      return;
    }
    const newVisit: VisitType = {
      id: `v${Date.now()}`,
      employeeId,
      time,
      duration,
    };
    setVisits((prev) => [...prev, newVisit]);
    setModal(null);
    setDuration(15);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4">
        <h1 className="col-start-1 text-xl font-normal mb-4">
          {currentDate.format("dddd, DD")}
        </h1>
      </div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr]">
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
                  occupied={isSlotOccupied(visits, e.id, time)}
                  onClick={() => {
                    setModal({ type: "add", employeeId: e.id, time });
                  }}
                >
                  {visits
                    .filter((v) => {
                      return v.employeeId === e.id && v.time === time;
                    })
                    .map((v) => (
                      <Visit
                        key={v.id}
                        visit={v}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal({
                            type: "edit",
                            employeeId: v.employeeId,
                            time: v.time,
                          });
                        }}
                      />
                    ))}
                </TimeSlot>
              ))}
            </React.Fragment>
          ))}
        </div>
      </DndContext>

      {modal && (
        <Modal handlerClick={() => setModal(null)}>
          {modal.type === "edit" ? (
            <EditVisitModal
              employees={employees}
              modal={modal as EditVisitModalState}
            />
          ) : modal.type === "add" ? (
            <AddVisitModal
              employees={employees}
              modal={modal as AddVisitModalState}
              addVisit={addVisit}
              duration={duration}
              onClose={() => setModal(null)}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
}
