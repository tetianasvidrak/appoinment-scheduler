import React, { useState } from "react";
import { Typography } from "@mui/material";
import { DndContext, pointerWithin, type DragEndEvent } from "@dnd-kit/core";

import { AddVisitModal } from "../AddVisitModal";
import { EditVisitModal } from "../EditVisitModal";
import { Modal } from "../Modal";
import { TimeSlot } from "../TimeSlot";
import { Visit } from "../Visit";

import { isSlotOccupied } from "./index.helper";
import {
  timeToMinutes,
  minutesToTime,
  generate15MinTimeSlots,
} from "../../helpers/time";

import type { SchedulerProps } from "./index.model";
import type { ModalState } from "../Modal/index.model";
import type { AddVisitModalState } from "../AddVisitModal/index.model";
import type { EditVisitModalState } from "../EditVisitModal/index.model";
import type { ServiceType } from "../../model/service.model";
import type { ClientType } from "../../model/client.model";
import type { VisitPayload } from "../../model/visit.model";

import {
  useAddVisitMutation,
  useGetClientsQuery,
  useGetEmployeesQuery,
  useGetVisitsQuery,
} from "../../services/apiSlice";

export default function Scheduler({ date }: SchedulerProps) {
  const formattedDate = date?.format("YYYY-MM-DD") ?? "";

  const { data: visits = [] } = useGetVisitsQuery({ date: formattedDate });
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: clients = [], error, isLoading } = useGetClientsQuery();
  const [addVisit] = useAddVisitMutation();
  const [modal, setModal] = useState<ModalState | null>(null);

  const times = generate15MinTimeSlots();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const visitId = active.id;
    const target = over.data.current;
    if (!target) return;

    const { employeeId, time } = target;
    const movedVisit = visits.find((v) => v._id === visitId);
    if (!movedVisit) return;

    const durationSlots = movedVisit.duration / 15;

    if (
      [...Array(durationSlots).keys()].some((i) => {
        const slotTime = minutesToTime(timeToMinutes(time) + i * 15);
        return visits.some(
          (v) =>
            v._id !== movedVisit._id &&
            v.employeeId === employeeId &&
            timeToMinutes(slotTime) >= timeToMinutes(v.time) &&
            timeToMinutes(slotTime) < timeToMinutes(v.time) + v.duration
        );
      })
    )
      return;

    // setVisits((prev) =>
    //   prev.map((v) => (v.id === visitId ? { ...v, employeeId, time } : v))
    // );
  };

  const createVisitPayload = (
    employeeId: string,
    time: string,
    duration: number,
    services: ServiceType[],
    client: ClientType,
    note: string
  ) => {
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

    const newVisit: VisitPayload = {
      employeeId,
      client: client._id,
      services: services.map((service) => ({
        category: service.category._id,
        service: service._id,
      })),
      date: formattedDate,
      time,
      duration,
      note,
    };

    addVisit(newVisit);
    setModal(null);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4">
        <Typography variant="h6" gutterBottom>
          {date?.format("dddd, DD")}
        </Typography>
      </div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr]">
          <div></div>
          {employees.map((e) => (
            <div key={e._id} className="text-center font-semibold text-lg">
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
                  key={e._id}
                  employeeId={e._id}
                  time={time}
                  occupied={isSlotOccupied(visits, e._id, time)}
                  onClick={() => {
                    setModal({ type: "add", employeeId: e._id, time });
                  }}
                >
                  {visits
                    .filter((v) => {
                      return v.employeeId._id === e._id && v.time === time;
                    })
                    .map((v) => (
                      <Visit
                        key={v._id}
                        visit={v}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal({
                            type: "edit",
                            employeeId: v.employeeId._id,
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
              addVisit={createVisitPayload}
              clients={clients}
              onClose={() => setModal(null)}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
}
