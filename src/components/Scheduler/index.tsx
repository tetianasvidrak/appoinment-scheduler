import React, { useState } from "react";
import { Typography } from "@mui/material";
import { DndContext, pointerWithin, type DragEndEvent } from "@dnd-kit/core";

import { VisitFormModal } from "../VisitFormModal";
import { Modal } from "../Modal";
import { TimeSlot } from "../TimeSlot";
import { Visit } from "../Visit";

// import { checkSlotOccupation } from "./index.helper";
import { generate15MinTimeSlots } from "../../helpers/time";

import type { SchedulerProps, VisitFormType } from "./index.model";
import type { ModalState } from "../Modal/index.model";
import type { VisitPayload } from "../../model/visit.model";

import {
  useAddVisitMutation,
  useGetClientsQuery,
  useGetEmployeesQuery,
  useGetVisitsQuery,
  useUpdateVisitMutation,
} from "../../services/apiSlice";
// import { countOverlappingVisits } from "../../helpers/overlappingVisits";
import { checkSlotOccupation } from "./index.helper";

export default function Scheduler({ date }: SchedulerProps) {
  const formattedDate = date?.format("YYYY-MM-DD") ?? "";

  const { data: visits = [] } = useGetVisitsQuery({ date: formattedDate });
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: clients = [] } = useGetClientsQuery();
  const [addVisit] = useAddVisitMutation();
  const [updateVisit] = useUpdateVisitMutation();
  const [modal, setModal] = useState<ModalState | null>(null);

  const times = generate15MinTimeSlots();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const visitId = active.id as string;
    const target = over.data.current;
    if (!target) return;

    const { employeeId, time } = target;

    const movedVisit = visits.find((v) => v._id === visitId);
    const employeeVisits = visits.filter(
      (v) => v.employee._id === employeeId && v._id !== visitId
    );
    if (!movedVisit) return;

    const isSlotOccupied = checkSlotOccupation(
      movedVisit,
      employeeVisits,
      time
    );

    if (isSlotOccupied) return;

    updateVisit({
      id: visitId,
      data: {
        employee: employeeId,
        time,
        date: formattedDate,
        duration: movedVisit.duration,
        services: movedVisit.services.map((s) => ({
          category: s.category._id!,
          service: s.service._id!,
        })),
        client: movedVisit.client._id,
        note: movedVisit.note ?? "",
      },
    });
  };

  const createOrUpdateVisit = (data: VisitFormType) => {
    if (!data.duration || data.duration < 15 || data.duration % 15 !== 0) {
      alert("Тривалість має бути кратною 15 і не менше 15 хвилин");
      return;
    }
    // const visitSlots = data.duration / 15;
    // if (
    //   [...Array(visitSlots).keys()].some((i) =>
    //     checkSlotOccupation(
    //       visits,
    //       data.employeeId,
    //       minutesToTime(timeToMinutes(data.time) + i * 15)
    //     )
    //   )
    // ) {
    //   alert("Слот зайнятий");
    //   return;
    // }

    if (data.mode === "edit") {
      updateVisit({
        id: data.id,
        data: {
          employee: data.employeeId,
          time: data.time,
          date: formattedDate,
          duration: data.duration,
          services: data.services.map((s) => ({
            category: s.category._id,
            service: s._id,
          })),
          client: data.client,
          note: data.note,
        },
      });
      setModal(null);
      return;
    }

    const newVisit: VisitPayload = {
      employee: data.employeeId,
      client: data.client,
      services: data.services.map((service) => ({
        category: service.category._id,
        service: service._id,
      })),
      date: formattedDate,
      time: data.time,
      duration: data.duration,
      note: data.note,
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
              <div className="text-right pr-2 text-sm text-gray-500">
                {time}
              </div>
              {employees.map((e) => (
                <TimeSlot
                  key={e._id}
                  visits={visits}
                  employeeId={e._id}
                  time={time}
                  // occupied={checkSlotOccupation(visits, e._id, time)}
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
          ))}
        </div>
      </DndContext>

      {modal && (
        <Modal onClose={() => setModal(null)}>
          <VisitFormModal
            mode={modal.type === "edit" ? "edit" : "create"}
            employees={employees}
            clients={clients}
            modal={modal}
            onClose={() => setModal(null)}
            initialData={
              modal.type === "edit"
                ? {
                    id: modal.visit._id,
                    client: modal.visit.client._id,
                    services: modal.visit.services.map((s) => s.service),
                    note: modal.visit.note || "",
                  }
                : undefined
            }
            onSubmit={(data) => createOrUpdateVisit(data)}
          />
        </Modal>
      )}
    </div>
  );
}
