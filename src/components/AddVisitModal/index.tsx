import { CheckboxServices } from "../CheckboxServices";

import type { AddVisitModalProps } from "./index.model";

export const AddVisitModal = ({
  employees,
  modal,
  addVisit,
  duration,
  onClose,
}: AddVisitModalProps) => {
  return (
    <>
      {" "}
      <h2 className="text-xl font-semibold mb-2">New appointment</h2>
      <div className="mb-5 w-md flex flex-col items-start gap-3">
        <p>
          Employee: {employees.find((e) => e.id === modal.employeeId)?.name}
        </p>
        <CheckboxServices />

        <p>Time: {modal.time}</p>
        <p>Client: Maria Jose</p>

        <textarea
          placeholder="Notes"
          className="p-2 bg-pink-100 border caret-pink-500 focus:outline-pink-500 rounded resize-none w-full"
        ></textarea>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => addVisit(modal.employeeId, modal.time, duration)}
          className="bg-blue-500 text-white px-7 py-2 rounded cursor-pointer"
        >
          Add
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </>
  );
};
